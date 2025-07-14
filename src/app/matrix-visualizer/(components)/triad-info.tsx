import { Paper, Select, Text, Group, Box, ActionIcon, Stack, SegmentedControl } from "@mantine/core";
import { Pose } from "./pose";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { motion } from "framer-motion";
import { type MutableRefObject, type FC, useState } from "react";
import { type TriadPoseDisplayType, type TriadPoseDisplayParams, type EulerAngleOrders } from "../types";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  const [poseDisplayParams, setPoseDisplayParams] = useState<TriadPoseDisplayParams>({
    type: "euler",
    angleOrder: "xyz",
  });

  return (
    <motion.div
      className="absolute right-[25px] top-[25px] z-10 cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={props.parentRef}
      dragElastic={false}
      dragTransition={{ velocity: 0 }}
    >
      <Paper shadow="sm" p="sm" pl="5px">
        <Group align="center" gap="5px">
          <DynamicTablerIcon name="IconGripVertical" size={20} className="mt-[2px]" />
          <Stack gap={0}>
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
            <Group gap="xs">
              <Stack gap="2px">
                <Group gap="5px">
                  <SegmentedControl
                    size="xs"
                    data={["euler", "matrix"]}
                    onChange={(type) =>
                      setPoseDisplayParams({ ...poseDisplayParams, type: type as TriadPoseDisplayType })
                    }
                    value={poseDisplayParams.type}
                  />
                  <Select
                    size="xs"
                    w="75px"
                    data={["xyz", "zyz"]}
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
              </Stack>
              <Stack gap={0}>
                <Text size="sm" fw={500}>
                  {poseDisplayParams.type === "euler" ? "Pose" : "Matrix"}
                </Text>
                <Pose
                  editable={false}
                  matrixData={[0, 0, 0, 0, 0, 0]}
                  displayType={poseDisplayParams.type}
                  angleOrder={poseDisplayParams.angleOrder}
                />
              </Stack>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </motion.div>
  );
};
