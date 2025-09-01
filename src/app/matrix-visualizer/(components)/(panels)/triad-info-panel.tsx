import { ActionIcon, Group, Paper, Select, Stack, Text } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { useFormik, type FormikHandlers } from "formik";
import { useEffect, useState } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { getAllMatrixNamesAndIds, getAllSettings, getMatrix, updateMatrix } from "../../(database)/queries";
import { type Matrix } from "../../(database)/tables";
import { BASE_FRAME_MATRIX, UNIT_RATIOS, type UnitOptions } from "../../constants";
import {
  convertEulerPoseToMatrix,
  convertMatrixToEulerPose,
  convertPoseToDegrees,
  convertPoseToRadians,
  getTriadMatrixInAnotherFrame,
  roundArray,
} from "../../helpers";
import { useStates3d, useTriadInfoPanelState } from "../../states";
import { type TriadForm, type TriadPoseDisplayType, type TriadPose } from "../../types";
import { Pose } from "../(pose-display)/pose";
import { TriadNameAndSphereColorDisplay } from "../(triad-form)/name-and-sphere-color-display";
import { PoseTypeSelection } from "../(triad-form)/pose-type-selection";
import { onPoseTypeChange } from "./triad-form-helpers";
import { CopyPasteButtons } from "../(triad-form)/copy-paste-buttons";
import { ResetButton } from "../(triad-form)/reset-button";

export const TriadInfoPanel = () => {
  const states3d = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();
  const selectedTriad = useLiveQuery(async () => await getMatrix(triadInfoPanelState.triadId), [triadInfoPanelState]);
  const matrixNamesAndIds =
    useLiveQuery(async () => await getAllMatrixNamesAndIds([triadInfoPanelState.triadId]), [triadInfoPanelState]) ?? [];

  const allSettings = useLiveQuery(async () => await getAllSettings());
  const unitSetting = (allSettings?.find((setting) => setting.id === 3)?.value as UnitOptions) ?? "mm";
  const angleSetting = allSettings?.find((setting) => setting.id === 1)?.value as string;

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isPoseError, setIsPoseError] = useState<boolean>(false);

  const initialValuesFromSelected: TriadForm = {
    name: selectedTriad?.name ?? "",
    parent: selectedTriad?.parent,
    colors: selectedTriad?.colors ?? { x: "#808080", y: "#808080", z: "#808080", sphere: "#808080" },
    type: "euler",
    angleOrder: "XYZ",
    pose:
      selectedTriad !== undefined
        ? roundArray(convertPoseToDegrees(selectedTriad.pose, angleSetting))
        : [0, 0, 0, 0, 0, 0],
    matrix: convertEulerPoseToMatrix(selectedTriad !== undefined ? selectedTriad.pose : [0, 0, 0, 0, 0, 0], "XYZ"),
  };

  const triadForm = useFormik({
    initialValues: initialValuesFromSelected,
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
      if (noSelectedTriad) return;
      const pose: TriadPose =
        values.type === "euler"
          ? convertPoseToRadians(values.pose, angleSetting)
          : convertMatrixToEulerPose(values.matrix, values.angleOrder);
      await updateMatrix(selectedTriad.id, {
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
      setMode("view");
    },
  });

  useEffect(() => {
    triadForm.resetForm({ values: initialValuesFromSelected });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTriad, mode]);

  const handleChangeMode = (updateForm: FormikHandlers["handleChange"]) => {
    if (mode == "view") {
      setMode("edit");
      if (selectedTriad !== undefined) updateForm({ target: { name: "pose", value: selectedTriad.pose } });
    } else setMode("view");
  };

  const handleFieldChange = <T extends keyof typeof initialValuesFromSelected>(
    name: T,
    value: (typeof initialValuesFromSelected)[T],
  ) => {
    triadForm.handleChange({ target: { name, value } });
  };

  const handlePoseTypeChange = (newPoseType: TriadPoseDisplayType) => {
    onPoseTypeChange(newPoseType, triadForm.values, angleSetting, handleFieldChange);
  };

  const { name, colors, angleOrder, matrix, pose, type, parent } = triadForm.values;
  const noSelectedTriad = selectedTriad === undefined;
  const isBaseFrame = selectedTriad?.id === BASE_FRAME_MATRIX.id;

  return (
    <Paper shadow="sm" p="sm" pt="5px">
      <form onSubmit={triadForm.handleSubmit}>
        <Stack gap="xs">
          <Group gap="xs" align="center" justify="space-between">
            <Group gap="xs">
              <TriadNameAndSphereColorDisplay
                editable={mode === "edit"}
                name={name}
                color={colors.sphere}
                nameError={triadForm.errors.name}
                setColor={(sphere) => handleFieldChange("colors", { ...colors, sphere })}
                setName={triadForm.handleChange}
              />
            </Group>
            <Group gap="3px">
              {mode === "edit" && (
                <ActionIcon
                  variant="light"
                  size="md"
                  type="submit"
                  disabled={noSelectedTriad || isBaseFrame || isPoseError}
                >
                  <DynamicTablerIcon name="IconDeviceFloppy" size={16} />
                </ActionIcon>
              )}
              <ActionIcon
                variant="light"
                size="md"
                disabled={noSelectedTriad || isBaseFrame}
                onClick={() => handleChangeMode(triadForm.handleChange)}
              >
                <DynamicTablerIcon name={mode == "view" ? "IconPencil" : "IconCancel"} size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Group gap="5px">
            <PoseTypeSelection
              angleOrder={angleOrder}
              poseType={type}
              disablePoseTypeToggle={noSelectedTriad || isPoseError}
              setAngleOrder={(value) => handleFieldChange("angleOrder", value)}
              setPoseType={handlePoseTypeChange}
            />
            <CopyPasteButtons
              disableCopy={noSelectedTriad}
              disablePaste={noSelectedTriad || mode === "edit"}
              matrix={matrix}
              pose={pose}
              poseType={type}
              angleOrder={angleOrder}
              angleSetting={angleSetting}
              setMatrix={(value) => handleFieldChange("matrix", value)}
              setPose={(value) => handleFieldChange("pose", value)}
            />
          </Group>
          {matrixNamesAndIds.length > 0 &&
            selectedTriad !== undefined &&
            (mode == "view" ? (
              <Select
                label="Matrix with respect to"
                placeholder="None (base frame)"
                data={matrixNamesAndIds.map((triadWrt) => ({
                  value: triadWrt.id.toString(),
                  label: `${triadWrt.name} ${(selectedTriad.parent === undefined ? triadWrt.id === 0 : triadWrt.id === selectedTriad.parent) ? "(parent)" : ""}`,
                }))}
                value={parent?.toString() ?? "0"}
                onChange={(value) => {
                  if ((parent === undefined && value === "0") || value === parent?.toString()) return;

                  if (value === null) {
                    if (type === "matrix") {
                      handleFieldChange("matrix", initialValuesFromSelected.matrix);
                    } else {
                      handleFieldChange("pose", initialValuesFromSelected.pose);
                    }
                    handleFieldChange("parent", initialValuesFromSelected.parent);
                    return;
                  }

                  const transformedPose = getTriadMatrixInAnotherFrame(
                    selectedTriad.id,
                    parseInt(value),
                    states3d.scene,
                  );
                  if (transformedPose === undefined) return;

                  if (type === "matrix") {
                    handleFieldChange("matrix", transformedPose);
                  } else {
                    handleFieldChange(
                      "pose",
                      roundArray(
                        convertPoseToDegrees(convertMatrixToEulerPose(transformedPose, angleOrder), angleSetting),
                      ),
                    );
                  }
                  handleFieldChange("parent", parseInt(value));
                }}
                size="xs"
                searchable
                clearable
              />
            ) : (
              <Group gap="5px" align="self-end">
                <Select
                  label="Parent Matrix"
                  placeholder="None (base frame)"
                  data={matrixNamesAndIds.map((parentTriad) => ({
                    value: parentTriad.id.toString(),
                    label: `${parentTriad.name} ${(parent === undefined ? parentTriad.id === 0 : parentTriad.id === parent) ? "(current parent)" : ""}`,
                  }))}
                  defaultValue={parent?.toString() ?? "0"}
                  onChange={(parentId) =>
                    handleFieldChange("parent", parentId == null ? undefined : parseInt(parentId))
                  }
                  size="xs"
                  searchable
                />
                <ResetButton
                  angleOrder={angleOrder}
                  initialPose={selectedTriad.pose}
                  setMatrix={(value) => handleFieldChange("matrix", value)}
                  setPose={(value) => handleFieldChange("pose", value)}
                />
              </Group>
            ))}
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {triadForm.values.type === "euler" ? "Pose" : "Matrix"}
            </Text>
            <Pose
              editable={mode === "edit"}
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
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};
