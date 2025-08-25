import { ActionIcon, ActionIconGroup, Group, Paper, SegmentedControl, Select, Stack, Text } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { Formik, type FormikHandlers } from "formik";
import { motion } from "framer-motion";
import { type FC, type MutableRefObject, useState } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { deleteMatrix, getAllMatrixNamesAndIds, getMatrix, updateMatrix } from "../(database)/queries";
import { type Matrix } from "../(database)/tables";
import { BASE_FRAME_MATRIX } from "../constants";
import { convertEulerPoseToMatrix, convertMatrixToEulerPose, getWorldMatrix } from "../helpers";
import { useStates3d, useTriadInfoPanelState } from "../states";
import { type TriadPoseDisplayParams } from "../types";
import { Pose } from "./(pose-display)/pose";
import { type Matrix4Tuple } from "three";
import { ColorSelection } from "./(common)/color-selection";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  const states3d = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();
  const selectedMatrix = useLiveQuery(async () => await getMatrix(triadInfoPanelState.triadId));
  const matrixNamesAndIds =
    useLiveQuery(async () => await getAllMatrixNamesAndIds([triadInfoPanelState.triadId])) ?? [];

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const getTransformedTriadPose = (parentTriadId: string) => {
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

  return selectedMatrix !== undefined ? (
    <motion.div
      className={`absolute z-10 cursor-grab active:cursor-grabbing`}
      drag
      dragConstraints={props.parentRef}
      dragElastic={false}
      dragTransition={{ velocity: 0 }}
      style={{
        left: Math.round(triadInfoPanelState.x) + 50,
        top: Math.round(triadInfoPanelState.y) - 325,
      }}
    >
      <Paper shadow="sm" p="sm" pt="5px">
        <Formik
          initialValues={{ ...selectedMatrix, type: "euler", angleOrder: "XYZ" } as Matrix & TriadPoseDisplayParams}
          validateOnChange={true}
          onSubmit={async (values) => {
            await updateMatrix(selectedMatrix.id, {
              name: values.name.trim(),
              colors: values.colors,
              pose: values.pose,
              parent: values.parent,
            });
            setMode("view");
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack align="center" gap={0}>
                <DynamicTablerIcon name="IconGripHorizontal" size={20} />
                <Stack gap="xs">
                  <Group gap="xs" align="center" justify="space-between">
                    <Group gap="xs">
                      <ColorSelection
                        canSelect={mode === "edit"}
                        color={values.colors.sphere}
                        setColor={(color) =>
                          handleChange({ target: { name: "colors", value: { ...values.colors, sphere: color } } })
                        }
                      />
                      <Text fw={600}>{values.name}</Text>
                    </Group>
                    <Group gap="3px">
                      {mode === "edit" && (
                        <ActionIcon
                          variant="light"
                          size="md"
                          type="submit"
                          disabled={selectedMatrix.id === BASE_FRAME_MATRIX.id || disableSubmit}
                        >
                          <DynamicTablerIcon name="IconDeviceFloppy" size={16} />
                        </ActionIcon>
                      )}
                      <ActionIcon
                        variant="light"
                        size="md"
                        disabled={selectedMatrix.id === BASE_FRAME_MATRIX.id}
                        onClick={() => handleChangeMode(handleChange)}
                      >
                        <DynamicTablerIcon name={mode == "view" ? "IconPencil" : "IconCancel"} size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        size="md"
                        disabled={selectedMatrix.id === BASE_FRAME_MATRIX.id}
                        onClick={handleDeleteTriad}
                      >
                        <DynamicTablerIcon name="IconTrash" size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Group gap="5px">
                    <SegmentedControl
                      size="xs"
                      data={["euler", "matrix"]}
                      onChange={(value) => {
                        handleChange({ target: { name: "type", value } });
                      }}
                      value={values.type}
                    />
                    <Select
                      size="xs"
                      w="75px"
                      data={["XYZ", "ZYZ"]}
                      onChange={(value) => {
                        handleChange({ target: { name: "angleOrder", value } });
                      }}
                      value={values.angleOrder}
                    />
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
                        disabled={mode === "view"}
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
                  {matrixNamesAndIds.length > 0 &&
                    (mode == "view" ? (
                      <Select
                        label="Matrix with respect to"
                        placeholder="None (base frame)"
                        data={matrixNamesAndIds.map((matrix) => ({
                          value: matrix.id.toString(),
                          label: `${matrix.name} ${(values.parent === undefined ? matrix.id === 0 : matrix.id === values.parent) ? "(parent)" : ""}`,
                        }))}
                        defaultValue={values.parent === undefined ? "0" : values.parent.toString()}
                        onChange={(value) => {
                          if (value === null) {
                            handleChange({ target: { name: "pose", value: selectedMatrix.pose } });
                            return;
                          }
                          if ((values.parent === undefined && value === "0") || value === values.parent?.toString())
                            return;
                          handleChange({ target: { name: "pose", value: getTransformedTriadPose(value) } });
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
                            label: `${matrix.name} ${(values.parent === undefined ? matrix.id === 0 : matrix.id === values.parent) ? "(current parent)" : ""}`,
                          }))}
                          defaultValue={values.parent === undefined ? "0" : values.parent.toString()}
                          onChange={(parentId) => {
                            handleChange({
                              target: { name: "parent", value: parentId == null ? undefined : parseInt(parentId) },
                            });
                          }}
                          size="xs"
                          searchable
                        />
                        <ActionIcon
                          variant="default"
                          size="md"
                          onClick={() => handleChange({ target: { name: "pose", value: selectedMatrix.pose } })}
                        >
                          <DynamicTablerIcon name="IconRestore" size={16} />
                        </ActionIcon>
                      </Group>
                    ))}
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>
                      {values.type === "euler" ? "Pose" : "Matrix"}
                    </Text>
                    <Pose
                      editable={mode === "edit"}
                      setPose={(pose) => {
                        handleChange({ target: { name: "pose", value: pose } });
                      }}
                      pose={values.pose}
                      colors={values.colors}
                      displayType={values.type}
                      angleOrder={values.angleOrder}
                      disableSubmit={setDisableSubmit}
                      setTriadColors={(colors) =>
                        handleChange({ target: { name: "colors", value: { ...colors, sphere: values.colors.sphere } } })
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </motion.div>
  ) : null;
};
