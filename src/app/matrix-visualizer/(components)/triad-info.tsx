import { Paper, Select, Text, Group, ActionIcon, Stack, SegmentedControl } from "@mantine/core";
import { Pose } from "./(pose-display)/pose";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { motion } from "framer-motion";
import { type MutableRefObject, type FC } from "react";
import { type TriadPoseDisplayParams } from "../types";
import { BASE_FRAME_MATRIX, DEFAULT_AXIS_COLORS } from "../constants";
import { useStates3d, useTriadInfoPanelState } from "../states";
import { useLiveQuery } from "dexie-react-hooks";
import { deleteMatrix, getAllMatrixNamesAndIds, getMatrix } from "../(database)/queries";
import { Formik } from "formik";
import { type Matrix } from "../(database)/tables";
import { Euler, Quaternion, Vector3 } from "three";
import { convertEulerPoseToMatrix, convertMatrixToEulerPose, getWorldMatrix } from "../helpers";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  const states3d = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();
  const selectedMatrix = useLiveQuery(async () => await getMatrix(triadInfoPanelState.triadId));
  const matrixNamesAndIds =
    useLiveQuery(async () => await getAllMatrixNamesAndIds([triadInfoPanelState.triadId])) ?? [];

  const handleDeleteTriad = async () => {
    await deleteMatrix(triadInfoPanelState.triadId);
    triadInfoPanelState.hideTriadPanel();
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
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubmit={() => {}}
        >
          {({ values, handleChange }) => (
            <Stack align="center" gap={0}>
              <DynamicTablerIcon name="IconGripHorizontal" size={20} />
              <Stack gap="xs">
                <Group gap="xs" align="center" justify="space-between">
                  <Text fw={600}>{values.name}</Text>
                  <Group gap="3px">
                    <ActionIcon variant="light" size="md" disabled={selectedMatrix.id === BASE_FRAME_MATRIX.id}>
                      <DynamicTablerIcon name="IconPencil" size={16} />
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
                </Group>
                {matrixNamesAndIds.length > 0 && (
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
                      if ((values.parent === undefined && value === "0") || value === values.parent?.toString()) return;

                      const selectedTriad = states3d.scene?.getObjectByName(`triad-${triadInfoPanelState.triadId}`);
                      const selectedParentTriad = states3d.scene?.getObjectByName(`triad-${value}`);

                      if (selectedTriad === undefined || selectedParentTriad === undefined) return;
                      const selectedTriadWorldMatrix = getWorldMatrix(selectedTriad);
                      const selectedParentWorldMatrix = getWorldMatrix(selectedParentTriad);

                      const transformedMatrix = selectedTriadWorldMatrix
                        .multiply(selectedParentWorldMatrix.invert())
                        .toArray();
                      const transformedPose = convertMatrixToEulerPose(transformedMatrix, "XYZ");

                      handleChange({ target: { name: "pose", value: transformedPose } });
                    }}
                    size="xs"
                    searchable
                    clearable
                  />
                )}
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {values.type === "euler" ? "Pose" : "Matrix"}
                  </Text>
                  <Pose
                    colors={values.colors}
                    editable={false}
                    pose={values.pose}
                    displayType={values.type}
                    angleOrder={values.angleOrder}
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        </Formik>
      </Paper>
    </motion.div>
  ) : null;
};
