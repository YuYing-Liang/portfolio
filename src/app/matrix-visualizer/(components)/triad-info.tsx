import { Paper, Select, Text, Group, ActionIcon, Stack, SegmentedControl } from "@mantine/core";
import { Pose } from "./(pose-display)/pose";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { motion } from "framer-motion";
import { type MutableRefObject, type FC, useState } from "react";
import { type TriadPoseDisplayType, type TriadPoseDisplayParams, type EulerAngleOrders } from "../types";
import { DEFAULT_AXIS_COLORS } from "../constants";
import { useTriadInfoPanelState } from "../states";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  const triadInfoPanelState = useTriadInfoPanelState((state) => state);
  const [poseDisplayParams, setPoseDisplayParams] = useState<TriadPoseDisplayParams>({
    type: "euler",
    angleOrder: "XYZ",
  });

  return (
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
        <Stack align="center" gap={0}>
          <DynamicTablerIcon name="IconGripHorizontal" size={20} />
          <Stack gap="xs">
            <Group gap="xs" align="center" justify="space-between">
              <Text fw={600}>Matrix name</Text>
              <Group gap="3px">
                <ActionIcon variant="light" size="md">
                  <DynamicTablerIcon name="IconPencil" size={16} />
                </ActionIcon>
                <ActionIcon variant="light" size="md">
                  <DynamicTablerIcon name="IconTrash" size={16} />
                </ActionIcon>
              </Group>
            </Group>
            <Group gap="5px">
              <SegmentedControl
                size="xs"
                data={["euler", "matrix"]}
                onChange={(type) => setPoseDisplayParams({ ...poseDisplayParams, type: type as TriadPoseDisplayType })}
                value={poseDisplayParams.type}
              />
              <Select
                size="xs"
                w="75px"
                data={["XYZ", "ZYZ"]}
                onChange={(order) =>
                  setPoseDisplayParams({ ...poseDisplayParams, angleOrder: order as EulerAngleOrders })
                }
                value={poseDisplayParams.angleOrder}
              />
            </Group>
            <Select
              label="Matrix with respect to"
              placeholder="None (base frame)"
              data={["None (base frame)", "Matrix id 123 (parent)", "Ground", "TCP"]}
              size="xs"
              searchable
            />
            <Stack gap={0}>
              <Text size="sm" fw={500}>
                {poseDisplayParams.type === "euler" ? "Pose" : "Matrix"}
              </Text>
              <Pose
                colors={DEFAULT_AXIS_COLORS}
                editable={false}
                pose={[0, 0, 0, 0, 0, 0]}
                displayType={poseDisplayParams.type}
                angleOrder={poseDisplayParams.angleOrder}
              />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </motion.div>
  );
};
