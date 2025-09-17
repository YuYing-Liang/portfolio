import { Button, Group, Paper, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useChassisForm } from "~/app/kinematic-model-simulator/(states)/chassis-form";
import { useWheelForm } from "~/app/kinematic-model-simulator/(states)/wheel-form";

export const WheelFormPanel = () => {
  const wheelForm = useWheelForm();
  const {
    values: { id: selectedChassisId },
  } = useChassisForm();
  const hasRollers = wheelForm.values.rollerRotation !== undefined;

  return selectedChassisId !== undefined ? (
    <Paper shadow="xs" p="xs" w={300}>
      {wheelForm.values.id !== undefined ? (
        <form onSubmit={wheelForm.handleSubmit}>
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
                onClick={wheelForm.resetForm}
              >
                Cancel
              </Button>
            </Group>
            <TextInput
              name="name"
              label="Wheel Name"
              placeholder="Enter wheel name"
              required
              value={wheelForm.values.name}
              onChange={wheelForm.handleChange}
              error={!wheelForm.values.name.trim() ? "Name is required" : undefined}
            />
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="length"
                label="Length"
                placeholder="Enter length"
                type="number"
                required
                value={wheelForm.values.length}
                onChange={wheelForm.handleChange}
                error={!wheelForm.values.length || wheelForm.values.length <= 0 ? "Length must be positive" : undefined}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
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
                value={wheelForm.values.width}
                onChange={wheelForm.handleChange}
                error={!wheelForm.values.width || wheelForm.values.width <= 0 ? "Width must be positive" : undefined}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
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
                value={wheelForm.values.x}
                onChange={wheelForm.handleChange}
                error={isNaN(wheelForm.values.x) ? "x must be a number" : undefined}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
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
                value={wheelForm.values.y}
                onChange={wheelForm.handleChange}
                error={isNaN(wheelForm.values.y) ? "y must be a number" : undefined}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
                  </Text>
                }
                rightSectionWidth={50}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} spacing={"xs"}>
              {hasRollers && (
                <TextInput
                  name="rollerRotation"
                  label="Roller Rotation"
                  placeholder="Enter rotation"
                  type="number"
                  value={wheelForm.values.rollerRotation}
                  onChange={wheelForm.handleChange}
                  rightSection={
                    <Text size="sm" c="dimmed">
                      deg
                    </Text>
                  }
                  rightSectionWidth={50}
                />
              )}
              <Button
                classNames={{
                  root: "self-end",
                  section: "m-[5px]",
                }}
                variant="light"
                leftSection={<DynamicTablerIcon name={hasRollers ? "IconMinus" : "IconPlus"} size={16} />}
                onClick={() => wheelForm.setFieldValue("rollerRotation", hasRollers ? undefined : 0)}
              >
                {"Rollers"}
              </Button>
            </SimpleGrid>
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="rotation"
                label="Rotation"
                placeholder="Enter rotation"
                type="number"
                value={wheelForm.values.rotation}
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
      ) : (
        <Text size="sm" c="dimmed">
          {`Select a wheel from the list or create a wheel to edit its properties.`}
        </Text>
      )}
    </Paper>
  ) : null;
};
