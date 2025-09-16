import { Button, Group, Paper, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useCanvasState } from "~/app/kinematic-model-simulator/(states)/states";
import { useWheelForm } from "~/app/kinematic-model-simulator/(states)/wheel-form";

export const WheelFormPanel = () => {
  const wheelForm = useWheelForm();
  const { setOverlayGrid } = useCanvasState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOverlayGrid(false);
    console.log("Wheel Form Values:", {
      name: wheelForm.name,
      length: wheelForm.length,
      width: wheelForm.width,
      position: { x: wheelForm.x, y: wheelForm.y },
      rotation: wheelForm.rotation,
    });
  };

  const handleCancel = () => {
    setOverlayGrid(false);
  };

  return (
    <Paper shadow="xs" p="xs" w={300}>
      <form onSubmit={handleSubmit}>
        <Stack gap="xs">
          <Group gap="xs" justify="space-between">
            <Text size="md" fw={700}>
              {`Edit Wheel`}
            </Text>
            <Button
              classNames={{
                section: "m-[5px]",
              }}
              variant="default"
              size="xs"
              leftSection={<DynamicTablerIcon name="IconCancel" size={14} />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Group>
          <TextInput
            name="name"
            label="Wheel Name"
            placeholder="Enter wheel name"
            required
            value={wheelForm.name}
            onChange={wheelForm.handleChange}
            error={!wheelForm.name.trim() ? "Name is required" : undefined}
          />
          <SimpleGrid cols={2} spacing={"xs"}>
            <TextInput
              name="length"
              label="Length"
              placeholder="Enter length"
              type="number"
              required
              value={wheelForm.length}
              onChange={wheelForm.handleChange}
              error={!wheelForm.length || wheelForm.length <= 0 ? "Length must be positive" : undefined}
              rightSection={
                <Text size="sm" c="dimmed">
                  units
                </Text>
              }
              rightSectionWidth={50}
            />
            <TextInput
              name="width"
              label="Width"
              placeholder="Enter width"
              type="number"
              required
              value={wheelForm.width}
              onChange={wheelForm.handleChange}
              error={!wheelForm.width || wheelForm.width <= 0 ? "Width must be positive" : undefined}
              rightSection={
                <Text size="sm" c="dimmed">
                  units
                </Text>
              }
              rightSectionWidth={50}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing={"xs"}>
            <TextInput
              name="x"
              label="X from center"
              placeholder="Enter x"
              type="number"
              required
              value={wheelForm.x}
              onChange={wheelForm.handleChange}
              error={isNaN(wheelForm.x) ? "x must be a number" : undefined}
              rightSection={
                <Text size="sm" c="dimmed">
                  units
                </Text>
              }
              rightSectionWidth={50}
            />
            <TextInput
              name="y"
              label="Y from center"
              placeholder="Enter y"
              type="number"
              required
              value={wheelForm.y}
              onChange={wheelForm.handleChange}
              error={isNaN(wheelForm.y) ? "y must be a number" : undefined}
              rightSection={
                <Text size="sm" c="dimmed">
                  units
                </Text>
              }
              rightSectionWidth={50}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing={"xs"}>
            <TextInput
              name="rotation"
              label="Rotation"
              placeholder="Enter rotation"
              type="number"
              value={wheelForm.rotation}
              onChange={wheelForm.handleChange}
              rightSection={
                <Text size="sm" c="dimmed">
                  deg
                </Text>
              }
              rightSectionWidth={50}
            />
            <Button
              classNames={{
                root: "self-end",
                section: "m-[5px]",
              }}
              variant="light"
              type="submit"
              rightSection={<DynamicTablerIcon name="IconDeviceFloppy" size={16} />}
            >
              Save
            </Button>
          </SimpleGrid>
        </Stack>
      </form>
    </Paper>
  );
};
