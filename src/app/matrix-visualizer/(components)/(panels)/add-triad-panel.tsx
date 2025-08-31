import {
  Button,
  Paper,
  Text,
  Select,
  Group,
  SegmentedControl,
  InputWrapper,
  TextInput,
  ActionIcon,
  ActionIconGroup,
} from "@mantine/core";
import { DynamicTablerIcon } from "../../../(components)/Icon";
import { Pose } from "../(pose-display)/pose";
import { type TriadPoseDisplayParams } from "../../types";
import { DEFAULT_AXIS_COLORS, INITIAL_TRIAD_FORM_VALUES, UNIT_RATIOS, type UnitOptions } from "../../constants";
import { Formik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { addMatrix, getAllMatrixNamesAndIds, getAllSettings, getSetting } from "../../(database)/queries";
import { useTriadInfoPanelState } from "../../states";
import { useState } from "react";
import { convertDegressToRadians, convertEulerPoseToMatrix, convertMatrixToEulerPose } from "../../helpers";
import { type Matrix4Tuple } from "three";
import { ColorSelection } from "../(common)/color-selection";
import { PoseTypeSelection } from "../(triad-form)/pose-type-selection";
import { CopyPasteButtons } from "../(triad-form)/copy-paste-buttons";
import { TriadNameAndSphereColorDisplay } from "../(triad-form)/name-and-sphere-color-display";

export const AddTriadPanel = () => {
  const matrixNamesAndIds = useLiveQuery(async () => await getAllMatrixNamesAndIds()) ?? [];
  const [poseDisableSubmit, setPoseDisableSubmit] = useState<boolean>(false);

  const allSettings = useLiveQuery(async () => await getAllSettings());
  const unitSetting = (allSettings?.find((setting) => setting.id === 3)?.value as UnitOptions) ?? "mm";
  const angleSetting = allSettings?.find((setting) => setting.id === 1)?.value as string;

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Formik
        initialValues={{
          ...INITIAL_TRIAD_FORM_VALUES,
          matrix: convertEulerPoseToMatrix(INITIAL_TRIAD_FORM_VALUES.pose, INITIAL_TRIAD_FORM_VALUES.angleOrder),
        }}
        validate={(values) => {
          const errors: Partial<Record<keyof Matrix, string>> = {};
          if (values.name === undefined || values.name.trim() === "") {
            errors.name = "Matrix name required";
          } else if (matrixNamesAndIds.find((matrix) => matrix.name === values.name) !== undefined) {
            errors.name = "Name already exists";
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async (values) => {
          await addMatrix({
            name: values.name.trim(),
            colors: values.colors,
            pose: values.pose.map((poseElement, poseIndex) =>
              poseIndex <= 2
                ? poseElement / UNIT_RATIOS[unitSetting]
                : angleSetting === "deg"
                  ? convertDegressToRadians(poseElement)
                  : poseElement,
            ) as Matrix["pose"],
            parent: values.parent,
          });
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Text fw={600}>Add triad to scene</Text>
            <Group justify="space-between" gap="xs" mb="xs">
              <PoseTypeSelection
                angleOrder={values.angleOrder}
                poseType={values.type}
                setAngleOrder={(value) => handleChange({ target: { name: "angleOrder", value } })}
                setPoseType={(value) => handleChange({ target: { name: "type", value } })}
              />
              <CopyPasteButtons
                matrix={values.matrix}
                pose={values.pose}
                poseType={values.type}
                setMatrix={(value) => handleChange({ target: { name: "matrix", value } })}
                setPose={(value) => handleChange({ target: { name: "pose", value } })}
              />
            </Group>
            {matrixNamesAndIds.length > 0 && (
              <Select
                label="Parent Triad"
                placeholder="None (base frame)"
                data={matrixNamesAndIds.map((matrix) => ({
                  value: matrix.id.toString(),
                  label: matrix.name,
                }))}
                onChange={(parentId) => {
                  handleChange({
                    target: { name: "parent", value: parentId == null ? undefined : parseInt(parentId) },
                  });
                }}
                value={values.parent?.toString() ?? "0"}
                size="xs"
                searchable
              />
            )}
            <Group mt="5px" gap="0.25rem">
              <TriadNameAndSphereColorDisplay
                name={values.name}
                color={values.colors.sphere}
                nameError={errors.name}
                setColor={(sphere) => handleChange({ target: { name: "color", value: { ...values.colors, sphere } } })}
                setName={handleChange}
              />
            </Group>
            <Pose
              editable
              pose={values.pose}
              setPose={(value) => {
                handleChange({ target: { name: "pose", value } });
              }}
              colors={values.colors}
              angleOrder={values.angleOrder}
              displayType={values.type}
              disableSubmit={setPoseDisableSubmit}
              setTriadColors={(colors) =>
                handleChange({ target: { name: "colors", value: { ...colors, sphere: values.colors.sphere } } })
              }
            />
            <Button
              type="submit"
              variant="light"
              size="xs"
              disabled={poseDisableSubmit || !isValid}
              classNames={{ section: "m-[5px]" }}
              leftSection={<DynamicTablerIcon name="IconPlus" size={18} />}
            >
              {"Add Triad"}
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
};
