import { ActionIcon, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { type Wheel } from "../../../(database)/tables";
import { useCanvasState } from "~/app/kinematic-model-simulator/(states)/states";

export const WheelListPanel = () => {
  const { setOverlayGrid } = useCanvasState();
  const chassisList: Pick<Wheel, "id" | "name">[] = [
    {
      id: 0,
      name: "Wheel 1",
    },
  ];

  const handleAddWheel = () => {
    setOverlayGrid(true);
  };

  const handleEditWheel = (id: number) => () => {
    setOverlayGrid(true);
  };

  const handleDeleteWheel = (id: number) => () => {
    setOverlayGrid(false);
  };

  return (
    <Paper shadow="xs" p="xs">
      <Text size="md" fw={700}>
        {"Wheel List"}
      </Text>
      <Stack gap="xs" mt="sm">
        {chassisList.map((chassis) => (
          <Group key={chassis.id} justify="space-between" align="center">
            <Text
              size="md"
              className="rounded-[5px] px-[5px]"
              // bg="purple.1"
            >
              {chassis.name}
            </Text>
            <Group gap="5px">
              <ActionIcon size="md" variant="default" color="black" onClick={handleEditWheel(chassis.id)}>
                <DynamicTablerIcon name="IconPencil" size={16} />
              </ActionIcon>
              <ActionIcon size="md" variant="default" color="black" onClick={handleDeleteWheel(chassis.id)}>
                <DynamicTablerIcon name="IconTrash" size={16} />
              </ActionIcon>
            </Group>
          </Group>
        ))}
        <Button
          classNames={{
            root: "self-end",
            section: "m-[5px]",
          }}
          variant="light"
          onClick={handleAddWheel}
          leftSection={<DynamicTablerIcon name="IconWheel" size={16} />}
        >
          Add Wheel
        </Button>
      </Stack>
    </Paper>
  );
};
