import { Button, Paper, Text, Select, Group } from "@mantine/core";
import { DynamicTablerIcon } from "../../../(components)/Icon";
import { Pose } from "../(pose-display)/pose";
import { DEFAULT_AXIS_COLORS, UNIT_RATIOS, type UnitOptions } from "../../constants";
import { Formik, useFormik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { addMatrix, getAllMatrixNamesAndIds, getAllSettings } from "../../(database)/queries";
import { useEffect, useState } from "react";
import {
  convertDegreesToRadians,
  convertEulerPoseToMatrix,
  convertMatrixToEulerPose,
  convertPoseToDegrees,
  convertPoseToRadians,
  roundArray,
} from "../../helpers";
import { PoseTypeSelection } from "../(triad-form)/pose-type-selection";
import { CopyPasteButtons } from "../(triad-form)/copy-paste-buttons";
import { TriadNameAndSphereColorDisplay } from "../(triad-form)/name-and-sphere-color-display";
import { ResetButton } from "../(triad-form)/reset-button";
import { type TriadPoseDisplayType, type TriadPose, type TriadPoseDisplayParams } from "../../types";
import { type Matrix4Tuple } from "three";

const INITIAL_TRIAD_FORM_VALUES: Matrix & TriadPoseDisplayParams & { matrix: Matrix4Tuple } = {
  name: "New Triad",
  parent: undefined,
  pose: [0, 0, 0, 0, 0, 0],
  matrix: convertEulerPoseToMatrix([0, 0, 0, 0, 0, 0], "XYZ"),
  colors: DEFAULT_AXIS_COLORS,
  type: "euler",
  angleOrder: "XYZ",
};

export const AddTriadPanel = () => {
  const matrixNamesAndIds = useLiveQuery(async () => await getAllMatrixNamesAndIds()) ?? [];
  const [isPoseError, setIsPoseError] = useState<boolean>(false);

  const allSettings = useLiveQuery(async () => await getAllSettings());
  const unitSetting = (allSettings?.find((setting) => setting.id === 3)?.value as UnitOptions) ?? "mm";
  const angleSetting = allSettings?.find((setting) => setting.id === 1)?.value as string;

  const addTriadForm = useFormik({
    initialValues: { ...INITIAL_TRIAD_FORM_VALUES },
    validate: (values) => {
      const errors: Partial<Record<keyof Matrix, string>> = {};
      if (values.name === undefined || values.name.trim() === "") {
        errors.name = "Matrix name required";
      } else if (matrixNamesAndIds.find((matrix) => matrix.name === values.name) !== undefined) {
        errors.name = "Name already exists";
      }
      return errors;
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      const pose: TriadPose =
        values.type === "euler"
          ? convertPoseToRadians(values.pose, angleSetting)
          : convertMatrixToEulerPose(values.matrix, values.angleOrder);
      await addMatrix({
        name: values.name.trim(),
        colors: values.colors,
        pose: [
          pose[0] / UNIT_RATIOS[unitSetting],
          pose[1] / UNIT_RATIOS[unitSetting],
          pose[2] / UNIT_RATIOS[unitSetting],
          pose[3],
          pose[4],
          pose[5],
        ],
        parent: values.parent,
      });
    },
  });

  const { angleOrder, colors, matrix, name, pose, type, parent } = addTriadForm.values;

  const handleFieldChange = <T extends keyof typeof INITIAL_TRIAD_FORM_VALUES>(
    name: T,
    value: (typeof INITIAL_TRIAD_FORM_VALUES)[T],
  ) => {
    addTriadForm.handleChange({ target: { name, value } });
  };

  const handlePoseTypeChange = (newPoseType: TriadPoseDisplayType) => {
    if (newPoseType === "matrix" && type === "euler") {
      handleFieldChange("matrix", convertEulerPoseToMatrix(convertPoseToRadians(pose, angleSetting), angleOrder));
    } else if (newPoseType === "euler" && type === "matrix") {
      handleFieldChange("pose", roundArray(convertPoseToDegrees(convertMatrixToEulerPose(matrix, angleOrder), angleSetting), 2));
    }
    handleFieldChange("type", newPoseType);
  };

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <form onSubmit={addTriadForm.handleSubmit}>
        <Text fw={600}>Add triad to scene</Text>
        <Group justify="space-between" gap="xs" mb="xs">
          <PoseTypeSelection
            angleOrder={angleOrder}
            poseType={type}
            disablePoseTypeToggle={isPoseError}
            setAngleOrder={(value) => handleFieldChange("angleOrder", value)}
            setPoseType={handlePoseTypeChange}
          />
          <CopyPasteButtons
            matrix={matrix}
            pose={pose}
            poseType={type}
            angleOrder={angleOrder}
            angleSetting={angleSetting}
            setMatrix={(value) => handleFieldChange("matrix", value)}
            setPose={(value) => handleFieldChange("pose", value)}
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
            onChange={(parentId) => handleFieldChange("parent", parentId == null ? undefined : parseInt(parentId))}
            value={parent?.toString() ?? "0"}
            size="xs"
            searchable
          />
        )}
        <Group mt="5px" gap="0.25rem">
          <TriadNameAndSphereColorDisplay
            name={name}
            color={colors.sphere}
            nameError={addTriadForm.errors.name}
            setColor={(sphere) => handleFieldChange("colors", { ...colors, sphere })}
            setName={addTriadForm.handleChange}
          />
          <ResetButton
            angleOrder={angleOrder}
            initialPose={INITIAL_TRIAD_FORM_VALUES.pose}
            setMatrix={(value) => handleFieldChange("matrix", value)}
            setPose={(value) => handleFieldChange("pose", value)}
          />
        </Group>
        <Pose
          editable
          pose={pose}
          matrix={matrix}
          colors={colors}
          angleOrder={angleOrder}
          displayType={type}
          disableSubmit={setIsPoseError}
          setMatrix={(value) => handleFieldChange("matrix", value)}
          setPose={(value) => handleFieldChange("pose", value)}
          setTriadColors={(value) => handleFieldChange("colors", { ...colors, ...value })}
        />
        <Button
          type="submit"
          variant="light"
          size="xs"
          disabled={isPoseError || !addTriadForm.isValid}
          classNames={{ section: "m-[5px]" }}
          leftSection={<DynamicTablerIcon name="IconPlus" size={18} />}
        >
          {"Add Triad"}
        </Button>
      </form>
    </Paper>
  );
};
