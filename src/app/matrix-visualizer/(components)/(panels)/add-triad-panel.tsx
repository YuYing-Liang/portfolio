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
import { DEFAULT_AXIS_COLORS, UNIT_RATIOS, UnitOptions } from "../../constants";
import { Formik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { addMatrix, getAllMatrixNamesAndIds, getAllSettings, getSetting } from "../../(database)/queries";
import { useTriadInfoPanelState } from "../../states";
import { useState } from "react";
import { convertDegressToRadians, convertEulerPoseToMatrix, convertMatrixToEulerPose } from "../../helpers";
import { type Matrix4Tuple } from "three";
import { ColorSelection } from "../(common)/color-selection";

const INITIAL_FORM_VALUES: Matrix & TriadPoseDisplayParams = {
  name: "New Triad",
  parent: undefined,
  pose: [0, 0, 0, 0, 0, 0],
  colors: DEFAULT_AXIS_COLORS,
  type: "euler",
  angleOrder: "XYZ",
};

export const AddTriadPanel = () => {
  const hideInfoPanel = useTriadInfoPanelState((state) => state.hideTriadPanel);
  const matrixNamesAndIds = useLiveQuery(async () => await getAllMatrixNamesAndIds()) ?? [];
  const [poseDisableSubmit, setPoseDisableSubmit] = useState<boolean>(false);

  const allSettings = useLiveQuery(async () => await getAllSettings());
  const unitSetting = (allSettings?.find((setting) => setting.id === 3)?.value as UnitOptions) ?? "mm";
  const angleSetting = allSettings?.find((setting) => setting.id === 1)?.value as string;

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Formik
        initialValues={{ ...INITIAL_FORM_VALUES }}
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
          hideInfoPanel();
          // const triadPose = new Vector3(values.pose[0], values.pose[1], values.pose[2]);
          // camera.position.set(triadPose.x, triadPose.y, triadPose.z + 5);
          // camera.lookAt(triadPose);
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Group justify="space-between" gap="xs" mb="xs">
              <Text fw={600}>Add triad to scene</Text>
              <ActionIconGroup>
                <ActionIcon
                  variant="default"
                  size="md"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `[${
                        values.type == "euler"
                          ? values.pose.toString()
                          : convertEulerPoseToMatrix(values.pose, values.angleOrder).toString()
                      }]`,
                    );
                  }}
                >
                  <DynamicTablerIcon name="IconCopy" size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  size="md"
                  onClick={async () => {
                    const poseStr = await navigator.clipboard.readText();
                    let pose = poseStr
                      .substring(1, poseStr.length - 1)
                      .split(",")
                      .filter((elem) => elem.trim() !== "")
                      .map(Number);
                    if (pose.length !== 6 && pose.length !== 16) return;
                    if (pose.length === 16) {
                      pose = convertMatrixToEulerPose(pose as Matrix4Tuple, values.angleOrder);
                    }
                    handleChange({ target: { name: "pose", value: pose } });
                  }}
                >
                  <DynamicTablerIcon name="IconClipboard" size={16} />
                </ActionIcon>
              </ActionIconGroup>
            </Group>
            <Group gap="5px">
              <SegmentedControl
                size="xs"
                data={["euler", "matrix"]}
                onChange={(value) => {
                  handleChange({ target: { name: "type", value } });
                  setPoseDisableSubmit(false);
                }}
                value={values.type}
              />
              <Select
                size="xs"
                w="75px"
                data={["XYZ", "ZYZ"]}
                onChange={(value) => {
                  if (value == null) return;
                  handleChange({ target: { name: "angleOrder", value } });
                  setPoseDisableSubmit(false);
                }}
                value={values.angleOrder}
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
              <ColorSelection
                canSelect
                name="Sphere color"
                color={values.colors.sphere}
                setColor={(color) =>
                  handleChange({ target: { name: "colors", value: { ...values.colors, sphere: color } } })
                }
              />
              <InputWrapper error={errors.name} w="fit-content">
                <TextInput
                  name="name"
                  value={values.name}
                  error={errors.name !== undefined}
                  placeholder="Matrix name"
                  size="xs"
                  onChange={handleChange}
                />
              </InputWrapper>
              <ActionIcon
                variant="default"
                size="md"
                onClick={() => handleChange({ target: { name: "pose", value: INITIAL_FORM_VALUES.pose } })}
              >
                <DynamicTablerIcon name="IconRestore" size={16} />
              </ActionIcon>
            </Group>
            <Pose
              editable
              pose={values.pose}
              setPose={(pose) => {
                handleChange({ target: { name: "pose", value: pose } });
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
