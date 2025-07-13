import { Button, Paper, Select, Space, Text, Group } from "@mantine/core";
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
    </Paper>
  );
};
