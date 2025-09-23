import { ActionIcon, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { DEFAULT_WHEEL_FORM_VALUES, useWheelForm } from "~/app/kinematic-model-simulator/(states)/wheel-form";
import { useChassisForm } from "~/app/kinematic-model-simulator/(states)/chassis-form";
import { useLiveQuery } from "dexie-react-hooks";
import {
  addWheel,
  deleteWheel,
  getWheelsByChassisId,
  getWheel,
  getWheelNamesByChassisId,
} from "~/app/kinematic-model-simulator/(database)/queries";
import { getDefaultName } from "~/app/kinematic-model-simulator/helpers";
import { type Wheel } from "~/app/kinematic-model-simulator/(database)/tables";

export const WheelListPanel = () => {
  const {
    values: { id: selectedChassisId },
  } = useChassisForm();
  const wheelForm = useWheelForm();
  const wheelList: Wheel[] =
    useLiveQuery(
      () => (selectedChassisId !== undefined ? getWheelsByChassisId(selectedChassisId) : new Promise(() => [])),
      [wheelForm.values.id],
    ) ?? [];

  const handleAddWheel = async () => {
    if (selectedChassisId === undefined) return;
    const wheelNames = await getWheelNamesByChassisId(selectedChassisId);
    const newWheel: Omit<Wheel, "id"> = {
      name: getDefaultName("New Wheel", Array.from(wheelNames).map(String)),
      chassis: selectedChassisId,
      width: DEFAULT_WHEEL_FORM_VALUES.width,
      length: DEFAULT_WHEEL_FORM_VALUES.length,
      color: "#888",
      frame: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    };
    const newWheelId = await addWheel(newWheel);
    wheelForm.setInitialValues({
      id: newWheelId,
      ...newWheel,
    });
  };

  const handleEditWheel = (id: number) => async () => {
    const wheel = await getWheel(id);
    if (wheel === undefined) return;
    wheelForm.setInitialValues(wheel);
  };

  const handleDeleteWheel = (id: number) => async () => {
    try {
      await deleteWheel(id);
      if (wheelForm.values.id === id) {
        wheelForm.resetForm();
      }
    } catch (error) {
      console.error("Failed to delete chassis:", error);
    }
  };

  return (
    <Paper shadow="xs" p="xs">
      {selectedChassisId !== undefined ? (
        <>
          <Text size="md" fw={700}>
            {"Wheel List"}
          </Text>
          <Stack gap="xs" mt="sm">
            {wheelList.map((wheel) => (
              <Group key={wheel.id} justify="space-between" align="center">
                <Text size="md" className="rounded-[5px] px-[5px]">
                  {wheel.name}
                </Text>
                <Group gap="5px">
                  <ActionIcon size="md" variant="default" color="black" onClick={handleEditWheel(wheel.id)}>
                    <DynamicTablerIcon name="IconPencil" size={16} />
                  </ActionIcon>
                  <ActionIcon size="md" variant="default" color="black" onClick={handleDeleteWheel(wheel.id)}>
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
        </>
      ) : (
        <Text size="sm" c="dimmed">
          {"Please select a chassis to manage its wheels."}
        </Text>
      )}
    </Paper>
  );
};
