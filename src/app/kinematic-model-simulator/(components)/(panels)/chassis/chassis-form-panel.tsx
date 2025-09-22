import {
  ActionIcon,
  ActionIconGroup,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { type FC } from "react";
import { type DynamicIconProps, DynamicTablerIcon } from "~/app/(components)/Icon";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../../../constants";
import { type ChassisFormValues, useChassisForm } from "../../../(states)/chassis-form";
import { type Chassis } from "~/app/kinematic-model-simulator/(database)/tables";
import { useWheelForm } from "~/app/kinematic-model-simulator/(states)/wheel-form";
import { getAllChassisNames, updateChassis } from "~/app/kinematic-model-simulator/(database)/queries";

export const ChassisFormPanel = () => {
  const chassisForm = useChassisForm();
  const {
    values: { id: selectedWheelId },
  } = useWheelForm();
  const isEditingWheel = selectedWheelId !== undefined;

  const handleSubmit = async (chassisFormValues: ChassisFormValues): Promise<boolean> => {
    if (chassisFormValues.id === undefined) return false;
    const takenChassisNames = await getAllChassisNames([chassisFormValues.id]);
    if (takenChassisNames.includes(chassisFormValues.name.trim())) {
      chassisForm.setErrors({ name: "Chassis name already taken" });
      return false;
    }
    await updateChassis(chassisFormValues.id, {
      name: chassisFormValues.name,
      type: chassisFormValues.type,
      frame: [
        Math.cos((chassisFormValues.rotation * Math.PI) / 180),
        Math.sin((chassisFormValues.rotation * Math.PI) / 180),
        -Math.sin((chassisFormValues.rotation * Math.PI) / 180),
        Math.cos((chassisFormValues.rotation * Math.PI) / 180),
      ],
      radius: chassisFormValues.type === "circular" ? chassisFormValues.radius : undefined,
      length: chassisFormValues.type === "rectangular" ? chassisFormValues.length : undefined,
      width: chassisFormValues.type === "rectangular" ? chassisFormValues.width : undefined,
      base: chassisFormValues.type === "triangular" ? chassisFormValues.base : undefined,
      height: chassisFormValues.type === "triangular" ? chassisFormValues.height : undefined,
    });
    return true;
  };

  return (
    <Paper shadow="xs" p="xs" w={300}>
      {chassisForm.values.id !== undefined ? (
        <Stack gap="xs">
          <Group gap="xs" justify="space-between">
            <Text size="md" fw={700}>
              {`Edit Chassis`}
            </Text>
            <ActionIconGroup>
              <ActionIcon
                onClick={() => chassisForm.resetForm(true)}
                variant="default"
                size="lg"
                disabled={isEditingWheel}
              >
                <DynamicTablerIcon name="IconRestore" size={18} />
              </ActionIcon>
              {Object.entries(CHASSIS_TYPE_TO_ICON_MAP).map(([type, icon], i) => (
                <ChassisButton
                  key={i}
                  icon={icon}
                  text={type}
                  disabled={isEditingWheel}
                  isSelected={chassisForm.values.type === type}
                  onClick={() => {
                    chassisForm.setFieldValue("type", type as Chassis["type"]);
                    if (type === "circular") {
                      chassisForm.setFieldValue("rotation", 0);
                    }
                  }}
                />
              ))}
            </ActionIconGroup>
          </Group>
          <TextInput
            name="name"
            label="Chassis Name"
            placeholder="Enter chassis name"
            required
            value={chassisForm.values.name}
            onChange={chassisForm.handleChange}
            error={chassisForm.errors.name}
            readOnly={isEditingWheel}
          />
          {chassisForm.values.type === "circular" && (
            <TextInput
              name="radius"
              label="Radius"
              placeholder="Enter radius"
              type="number"
              value={chassisForm.values.radius}
              onChange={chassisForm.handleChange}
              error={chassisForm.errors.radius}
              rightSection={
                <Text size="sm" c="dimmed">
                  px
                </Text>
              }
              rightSectionWidth={30}
              readOnly={isEditingWheel}
            />
          )}
          {chassisForm.values.type === "rectangular" && (
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="length"
                label="Length"
                placeholder="Enter length"
                type="number"
                value={chassisForm.values.length}
                onChange={chassisForm.handleChange}
                error={chassisForm.errors.length}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
                  </Text>
                }
                rightSectionWidth={30}
                readOnly={isEditingWheel}
              />
              <TextInput
                name="width"
                label="Width"
                placeholder="Enter width"
                type="number"
                value={chassisForm.values.width}
                onChange={chassisForm.handleChange}
                error={chassisForm.errors.width}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
                  </Text>
                }
                rightSectionWidth={30}
                readOnly={isEditingWheel}
              />
            </SimpleGrid>
          )}
          {chassisForm.values.type === "triangular" && (
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="base"
                label="Base"
                placeholder="Enter base"
                type="number"
                value={chassisForm.values.base}
                onChange={chassisForm.handleChange}
                error={chassisForm.errors.base}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
                  </Text>
                }
                rightSectionWidth={30}
                readOnly={isEditingWheel}
              />
              <TextInput
                name="height"
                label="Height"
                placeholder="Enter height"
                type="number"
                value={chassisForm.values.height}
                onChange={chassisForm.handleChange}
                error={chassisForm.errors.height}
                rightSection={
                  <Text size="sm" c="dimmed">
                    px
                  </Text>
                }
                rightSectionWidth={30}
                readOnly={isEditingWheel}
              />
            </SimpleGrid>
          )}
          <SimpleGrid cols={2} spacing={"xs"}>
            <TextInput
              name="rotation"
              label="Rotation"
              placeholder="Enter rotation"
              type="number"
              disabled={chassisForm.values.type === "circular"}
              readOnly={isEditingWheel}
              value={chassisForm.values.rotation}
              onChange={chassisForm.handleChange}
              error={chassisForm.errors.rotation}
              rightSection={
                <Text size="sm" c="dimmed">
                  deg
                </Text>
              }
              rightSectionWidth={50}
            />
            <Group gap="5px" align="end">
              <ActionIcon onClick={() => chassisForm.resetForm()} variant="default" size="lg" disabled={isEditingWheel}>
                <DynamicTablerIcon name="IconCancel" size={18} />
              </ActionIcon>
              <Button
                classNames={{
                  root: "self-end",
                  section: "m-[5px]",
                }}
                variant="light"
                size="sm"
                rightSection={<DynamicTablerIcon name="IconDeviceFloppy" size={16} />}
                disabled={isEditingWheel}
                onClick={chassisForm.handleSubmit(handleSubmit)}
              >
                Save
              </Button>
            </Group>
          </SimpleGrid>
        </Stack>
      ) : (
        <Text size="sm" c="dimmed">
          {"Select or add a chassis to edit its properties"}
        </Text>
      )}
    </Paper>
  );
};

interface ChassisButtonProps {
  icon: DynamicIconProps["name"];
  text: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}

const ChassisButton: FC<ChassisButtonProps> = (props) => (
  <Tooltip label={props.text} disabled={props.disabled}>
    <ActionIcon
      disabled={props.disabled}
      variant={props.isSelected ? "filled" : "light"}
      size="lg"
      onClick={props.onClick}
    >
      <DynamicTablerIcon name={props.icon} size={18} />
    </ActionIcon>
  </Tooltip>
);
