import { Button, Paper, Select, Space, Text, Group, Center, Box } from "@mantine/core";
import { MatrixData } from "./matrix-data";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { motion } from "framer-motion";
import { type MutableRefObject, type FC } from "react";
import { Container } from "postcss";

interface TriadInfoPanel {
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const TriadInfoPanel: FC<TriadInfoPanel> = (props) => {
  return (
    <motion.div
      className="absolute right-[25px] top-[25px] cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={props.parentRef}
      dragElastic={false}
      dragTransition={{ velocity: 0 }}
    >
      <Paper shadow="sm" p="sm" w="235px" pl="xs">
        <Group align="start" gap="xs">
          <DynamicTablerIcon name="IconGripVertical" size={20} className="mt-[2px]" />
          <Box>
            <Text fw={600}>Triad information</Text>
            <Text size="xs">{"id: skdjfsd-4sdf43d-vfkk9"}</Text>
            <Space h="sm" />
            <Select
              label="Matrix with respect to"
              placeholder="None (base frame)"
              data={["None (base frame)", "Matrix id 123 (parent)", "Ground", "TCP"]}
              size="xs"
              searchable
            />
            <MatrixData editable={false} matrixData={[0, 0, 0, 0, 0, 0]} />
            <Group gap="sm">
              <Button
                variant="light"
                size="xs"
                classNames={{ section: "m-[5px]" }}
                leftSection={<DynamicTablerIcon name="IconPencil" size={18} />}
              >
                {"Edit"}
              </Button>
              <Button
                variant="light"
                color="red"
                size="xs"
                classNames={{ section: "m-[5px]" }}
                leftSection={<DynamicTablerIcon name="IconTrash" size={18} />}
              >
                {"Delete"}
              </Button>
            </Group>
          </Box>
        </Group>
      </Paper>
    </motion.div>
  );
};
