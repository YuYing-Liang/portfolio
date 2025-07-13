import { Button, Paper, Select, Space, Text } from "@mantine/core";
import { MatrixData } from "./matrix-data";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export const TriadInfoPanel = () => {
  return (
    <Paper className="absolute right-[25px] top-[25px]" shadow="xs" p="sm">
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
      <Button variant="light" size="xs" p="xs" leftSection={<DynamicTablerIcon name="IconPencil" size={20} />}>
        {"Edit Triad"}
      </Button>
    </Paper>
  );
};
