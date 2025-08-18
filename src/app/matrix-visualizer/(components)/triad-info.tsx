import { Paper, Select, Text, Group, ActionIcon, Stack, SegmentedControl } from "@mantine/core";
import { Pose } from "./(pose-display)/pose";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { motion } from "framer-motion";
import { type MutableRefObject, type FC } from "react";
import { type TriadPoseDisplayParams } from "../types";
import { BASE_FRAME_MATRIX, DEFAULT_AXIS_COLORS } from "../constants";
import { useTriadInfoPanelState } from "../states";
import { useLiveQuery } from "dexie-react-hooks";
import { deleteMatrix, getAllMatrixNamesAndIds, getMatrix } from "../(database)/queries";
import { Formik } from "formik";
import { type Matrix } from "../(database)/tables";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  const triadInfoPanelState = useTriadInfoPanelState((state) => state);
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
                      label: matrix.name,
                    }))}
                    onChange={(value) => {
                      handleChange({ target: { name: "parent", value } });
                    }}
                    size="xs"
                    searchable
                  />
                )}
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {values.type === "euler" ? "Pose" : "Matrix"}
                  </Text>
                  <Pose
                    colors={DEFAULT_AXIS_COLORS}
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
