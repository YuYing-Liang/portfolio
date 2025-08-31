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
  convertDegressToRadians,
  convertEulerPoseToMatrix,
  convertMatrixToEulerPose,
  convertPoseToDegrees,
  getWorldMatrix,
} from "../../helpers";
import { useStates3d, useTriadInfoPanelState } from "../../states";
import { type TriadPose, type TriadPoseDisplayParams } from "../../types";
import { Pose } from "../(pose-display)/pose";
import { type Matrix4Tuple } from "three";
import { ColorSelection } from "../(common)/color-selection";

export const TriadInfoPanel = () => {
  const states3d = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();
  const selectedMatrix = useLiveQuery(async () => await getMatrix(triadInfoPanelState.triadId), [triadInfoPanelState]);
  const matrixNamesAndIds =
    useLiveQuery(async () => await getAllMatrixNamesAndIds([triadInfoPanelState.triadId]), [triadInfoPanelState]) ?? [];

  const allSettings = useLiveQuery(async () => await getAllSettings());
  const unitSetting = (allSettings?.find((setting) => setting.id === 3)?.value as UnitOptions) ?? "mm";
  const angleSetting = allSettings?.find((setting) => setting.id === 1)?.value as string;

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const valuesFromMatrix = {
    ...selectedMatrix,
    type: "euler",
    angleOrder: "XYZ",
    pose: convertPoseToDegrees(selectedMatrix?.pose, angleSetting),
  } as Matrix & TriadPoseDisplayParams;

  const triadForm = useFormik({
    initialValues: valuesFromMatrix,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (selectedMatrix === undefined) return;
      await updateMatrix(selectedMatrix.id, {
        name: values.name.trim(),
        colors: values.colors,
        pose: values.pose.map((poseElement, poseIndex) =>
          poseIndex < 3
            ? poseElement / UNIT_RATIOS[unitSetting]
            : angleSetting === "deg"
              ? convertDegressToRadians(poseElement)
              : poseElement,
        ) as Matrix["pose"],
        parent: values.parent,
      });
      setMode("view");
    },
  });

  useEffect(() => {
    triadForm.setValues(valuesFromMatrix);
  }, [selectedMatrix, mode]);

  const getTransformedTriadPose = (parentTriadId: string): TriadPose => {
    const selectedTriad = states3d.scene?.getObjectByName(`triad-${triadInfoPanelState.triadId}`);
    const selectedParentTriad = states3d.scene?.getObjectByName(`triad-${parentTriadId}`);

    if (selectedTriad === undefined || selectedParentTriad === undefined) return;
    const selectedTriadWorldMatrix = getWorldMatrix(selectedTriad);
    const selectedParentWorldMatrix = getWorldMatrix(selectedParentTriad);

    const transformedMatrix = selectedTriadWorldMatrix.multiply(selectedParentWorldMatrix.invert()).toArray();
    return convertMatrixToEulerPose(transformedMatrix, "XYZ");
  };

  const handleDeleteTriad = async () => {
    await deleteMatrix(triadInfoPanelState.triadId);
    triadInfoPanelState.hideTriadPanel();
  };

  const handleChangeMode = (updateForm: FormikHandlers["handleChange"]) => {
    if (mode == "view") {
      setMode("edit");
      if (selectedMatrix !== undefined) updateForm({ target: { name: "pose", value: selectedMatrix.pose } });
    } else setMode("view");
  };

  console.log(triadForm.values);
  return (
    <Paper shadow="sm" p="sm" pt="5px">
      <form onSubmit={triadForm.handleSubmit}>
        <Stack gap="xs">
          <Group gap="xs" align="center" justify="space-between">
            <Group gap="xs">
              <ColorSelection
                name="Sphere color"
                canSelect={mode === "edit"}
                color={triadForm.values?.colors?.sphere ?? "#808080"}
                setColor={(color) =>
                  triadForm.handleChange({ name: "colors", value: { ...triadForm.values.colors, sphere: color } })
                }
              />
              <Text fw={600}>{triadForm.values.name}</Text>
            </Group>
            <Group gap="3px">
              {mode === "edit" && (
                <ActionIcon
                  variant="light"
                  size="md"
                  type="submit"
                  disabled={selectedMatrix === undefined || selectedMatrix.id === BASE_FRAME_MATRIX.id || disableSubmit}
                >
                  <DynamicTablerIcon name="IconDeviceFloppy" size={16} />
                </ActionIcon>
              )}
              <ActionIcon
                variant="light"
                size="md"
                disabled={selectedMatrix === undefined || selectedMatrix.id === BASE_FRAME_MATRIX.id}
                onClick={() => handleChangeMode(triadForm.handleChange)}
              >
                <DynamicTablerIcon name={mode == "view" ? "IconPencil" : "IconCancel"} size={16} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                size="md"
                disabled={selectedMatrix === undefined || selectedMatrix.id === BASE_FRAME_MATRIX.id}
                onClick={handleDeleteTriad}
              >
                <DynamicTablerIcon name="IconTrash" size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Group gap="5px">
            <SegmentedControl
              size="xs"
              disabled={selectedMatrix === undefined}
              data={["euler", "matrix"]}
              onChange={(value) => {
                triadForm.handleChange({ name: "type", value });
              }}
              value={triadForm.values.type}
            />
            <Select
              disabled={selectedMatrix === undefined}
              size="xs"
              w="75px"
              data={["XYZ", "ZYZ"]}
              onChange={(value) => {
                triadForm.handleChange({ name: "angleOrder", value });
              }}
              value={triadForm.values.angleOrder}
            />
            <ActionIconGroup>
              <ActionIcon
                disabled={selectedMatrix === undefined || triadForm.values?.pose === undefined}
                variant="default"
                size="md"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `[${
                      triadForm.values.type == "euler"
                        ? triadForm.values.pose.toString()
                        : convertEulerPoseToMatrix(triadForm.values.pose, triadForm.values.angleOrder).toString()
                    }]`,
                  );
                }}
              >
                <DynamicTablerIcon name="IconCopy" size={16} />
              </ActionIcon>
              <ActionIcon
                variant="default"
                size="md"
                disabled={mode === "view" || selectedMatrix === undefined}
                onClick={async () => {
                  const poseStr = await navigator.clipboard.readText();
                  let pose = poseStr
                    .substring(1, poseStr.length - 1)
                    .split(",")
                    .filter((elem) => elem.trim() !== "")
                    .map(Number);
                  if (pose.length !== 6 && pose.length !== 16) return;
                  if (pose.length === 16) {
                    pose = convertMatrixToEulerPose(pose as Matrix4Tuple, triadForm.values.angleOrder);
                  }
                  triadForm.handleChange({ name: "pose", value: pose });
                }}
              >
                <DynamicTablerIcon name="IconClipboard" size={16} />
              </ActionIcon>
            </ActionIconGroup>
          </Group>
          {matrixNamesAndIds.length > 0 &&
            selectedMatrix !== undefined &&
            triadForm.values?.pose !== undefined &&
            (mode == "view" ? (
              <Select
                label="Matrix with respect to"
                placeholder="None (base frame)"
                data={matrixNamesAndIds.map((matrix) => ({
                  value: matrix.id.toString(),
                  label: `${matrix.name} ${(selectedMatrix.parent === undefined ? matrix.id === 0 : matrix.id === selectedMatrix.parent) ? "(parent)" : ""}`,
                }))}
                value={triadForm.values.parent?.toString() ?? "0"}
                onChange={(value) => {
                  if (
                    (triadForm.values.parent === undefined && value === "0") ||
                    value === triadForm.values.parent?.toString()
                  )
                    return;
                  const poseToChange = value === null ? [...selectedMatrix.pose] : getTransformedTriadPose(value);
                  triadForm.handleChange({ name: "pose", value: convertPoseToDegrees(poseToChange, angleSetting) });
                  triadForm.setFieldValue("parent", value ?? selectedMatrix.parent ?? "0");
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
                  data={matrixNamesAndIds.map((matrix) => ({
                    value: matrix.id.toString(),
                    label: `${matrix.name} ${(triadForm.values.parent === undefined ? matrix.id === 0 : matrix.id === triadForm.values.parent) ? "(current parent)" : ""}`,
                  }))}
                  defaultValue={triadForm.values.parent === undefined ? "0" : triadForm.values.parent.toString()}
                  onChange={(parentId) => {
                    triadForm.handleChange({
                      name: "parent",
                      value: parentId == null ? undefined : parseInt(parentId),
                    });
                  }}
                  size="xs"
                  searchable
                />
                <ActionIcon
                  variant="default"
                  size="md"
                  onClick={() => triadForm.setFieldValue("pose", selectedMatrix.pose)}
                >
                  <DynamicTablerIcon name="IconRestore" size={16} />
                </ActionIcon>
              </Group>
            ))}
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {triadForm.values.type === "euler" ? "Pose" : "Matrix"}
            </Text>
            {selectedMatrix !== undefined && (
              <Pose
                editable={
                  mode === "edit" && triadForm.values?.pose !== undefined && triadForm.values?.colors !== undefined
                }
                setPose={(pose) => {
                  triadForm.handleChange({ name: "pose", value: pose });
                }}
                pose={triadForm.values?.pose ?? [0, 0, 0, 0, 0, 0]}
                colors={triadForm.values?.colors ?? { x: "#808080", y: "#808080", z: "#808080" }}
                displayType={triadForm.values.type}
                angleOrder={triadForm.values.angleOrder}
                disableSubmit={setDisableSubmit}
                setTriadColors={(colors) =>
                  triadForm.handleChange({
                    name: "colors",
                    value: { ...colors, sphere: triadForm.values.colors.sphere },
                  })
                }
              />
            )}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};
