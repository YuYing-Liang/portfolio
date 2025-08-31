import { ActionIcon, ActionIconGroup, Group, Paper, SegmentedControl, Select, Stack, Text } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { useFormik, type FormikHandlers } from "formik";
import { useEffect, useState } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import {
  deleteMatrix,
  getAllMatrixNamesAndIds,
  getAllSettings,
  getMatrix,
  updateMatrix,
} from "../../(database)/queries";
import { type Matrix } from "../../(database)/tables";
import { BASE_FRAME_MATRIX, UNIT_RATIOS, type UnitOptions } from "../../constants";
import {
  convertDegreesToRadians,
  convertEulerPoseToMatrix,
  convertMatrixToEulerPose,
  convertPoseToDegrees,
  convertPoseToRadians,
  getTriadMatrixInAnotherFrame,
  getWorldMatrix,
  roundArray,
} from "../../helpers";
import { useStates3d, useTriadInfoPanelState } from "../../states";
import { TriadForm, TriadPoseDisplayType, type TriadPose, type TriadPoseDisplayParams } from "../../types";
import { Pose } from "../(pose-display)/pose";
import { type Matrix4Tuple } from "three";
import { ColorSelection } from "../(common)/color-selection";
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
    pose: selectedTriad !== undefined ? convertPoseToDegrees(selectedTriad.pose, angleSetting) : [0, 0, 0, 0, 0, 0],
    matrix: convertEulerPoseToMatrix(
      selectedTriad !== undefined ? convertPoseToRadians(selectedTriad.pose, angleSetting) : [0, 0, 0, 0, 0, 0],
      "XYZ",
    ),
  };

  const triadForm = useFormik({
    initialValues: initialValuesFromSelected,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (noSelectedMatrix) return;
      await updateMatrix(selectedTriad.id, {
        name: values.name.trim(),
        colors: values.colors,
        pose: values.pose.map((poseElement, poseIndex) =>
          poseIndex < 3
            ? poseElement / UNIT_RATIOS[unitSetting]
            : angleSetting === "deg"
              ? convertDegreesToRadians(poseElement)
              : poseElement,
        ) as Matrix["pose"],
        parent: values.parent,
      });
      setMode("view");
    },
  });

  useEffect(() => {
    triadForm.setValues(initialValuesFromSelected);
  }, [selectedTriad, mode]);

  const handleDeleteTriad = async () => {
    await deleteMatrix(triadInfoPanelState.triadId);
    triadInfoPanelState.hideTriadPanel();
  };

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
  const noSelectedMatrix = selectedTriad === undefined;
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
                  disabled={noSelectedMatrix || isBaseFrame || isPoseError}
                >
                  <DynamicTablerIcon name="IconDeviceFloppy" size={16} />
                </ActionIcon>
              )}
              <ActionIcon
                variant="light"
                size="md"
                disabled={noSelectedMatrix || isBaseFrame}
                onClick={() => handleChangeMode(triadForm.handleChange)}
              >
                <DynamicTablerIcon name={mode == "view" ? "IconPencil" : "IconCancel"} size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="md"
                disabled={noSelectedMatrix || isBaseFrame}
                onClick={handleDeleteTriad}
              >
                <DynamicTablerIcon name="IconTrash" size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Group gap="5px">
            <PoseTypeSelection
              angleOrder={angleOrder}
              poseType={type}
              disablePoseTypeToggle={noSelectedMatrix || isPoseError}
              setAngleOrder={(value) => handleFieldChange("angleOrder", value)}
              setPoseType={handlePoseTypeChange}
            />
            <CopyPasteButtons
              disableCopy={noSelectedMatrix}
              disablePaste={noSelectedMatrix || mode === "edit"}
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
                      convertPoseToDegrees(convertMatrixToEulerPose(transformedPose, angleOrder), angleSetting),
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
