import { ActionIcon, Button, Group, Paper, Popover, PopoverDropdown, PopoverTarget, Stack, Text } from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useDisclosure } from "@mantine/hooks";
import { type Chassis } from "../../../(database)/tables";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../../../constants";
import { DEFAULT_CHASSIS_FORM_VALUES, useChassisForm } from "~/app/kinematic-model-simulator/(states)/chassis-form";
import { useLiveQuery } from "dexie-react-hooks";
import {
  addChassis,
  deleteChassis,
  getAllChassis,
  getAllChassisNames,
  getChassis,
} from "~/app/kinematic-model-simulator/(database)/queries";
import { getDefaultName } from "~/app/kinematic-model-simulator/helpers";

export const ChassisListPanel = () => {
  const chassisList = useLiveQuery(() => getAllChassis()) ?? [];
  const chassisForm = useChassisForm();

  const handleEdit = async (id: number) => {
    const chassisToEdit = await getChassis(id);
    if (chassisToEdit === undefined) return;
    chassisForm.setInitialValues(chassisToEdit);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChassis(id);
      if (chassisForm.values.id === id) {
        chassisForm.resetForm();
      }
    } catch (error) {
      console.error("Failed to delete chassis:", error);
    }
  };

  const handleAddChassis = async () => {
    const chassisNames = await getAllChassisNames();
    const defaultNewChassis: Omit<Chassis & { type: "circular"; radius: number }, "id"> = {
      name: getDefaultName("New Chassis", Array.from(chassisNames).map(String)),
      type: "circular",
      frame: [1, 0, 0, 1],
      radius: DEFAULT_CHASSIS_FORM_VALUES.radius,
    };
    const newChassisId = await addChassis(defaultNewChassis);
    chassisForm.setInitialValues({
      id: newChassisId,
      ...defaultNewChassis,
    });
  };

  return (
    <Paper shadow="xs" p="xs">
      <Text size="md" fw={700}>
        {"Chassis List"}
      </Text>
      <Stack gap="xs" mt="sm">
        {chassisList.map((chassis) => (
          <ChassisListElement key={chassis.id} {...chassis} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
        {chassisList.length === 0 && (
          <Text size="sm" c="dimmed">
            You have no chassis created yet.
          </Text>
        )}
        <Button
          classNames={{
            root: "self-end",
            section: "m-[5px]",
          }}
          variant="light"
          type="submit"
          onClick={handleAddChassis}
          leftSection={<DynamicTablerIcon name="IconBoxModel" size={16} />}
        >
          Add Chassis
        </Button>
      </Stack>
    </Paper>
  );
};

type ChassisButtonProps = {
  handleEdit: (chassisId: number) => void;
  handleDelete: (chassisId: number) => void;
} & Chassis;

const ChassisListElement: FC<ChassisButtonProps> = (props) => {
  const [isSummaryOpen, { close: onCloseSummary, open: onOpenSummary }] = useDisclosure(false);

  const getSizeDisplay = (): string => {
    if (props.type === "circular") {
      return `r: ${props.radius}`;
    }

    if (props.type === "rectangular") {
      return `w: ${props.width}, l: ${props.length}`;
    }

    return `b: ${props.base}, h: ${props.height}`;
  };

  return (
    <Popover position="right" withArrow opened={isSummaryOpen} offset={5}>
      <PopoverTarget>
        <Group justify="space-between" onMouseEnter={onOpenSummary} onMouseLeave={onCloseSummary}>
          <Group>
            <DynamicTablerIcon name={CHASSIS_TYPE_TO_ICON_MAP[props.type]} size={18} />
            <Text size="sm" fw={700}>
              {props.name}
            </Text>
            <Text size="sm" fw={700}>
              ({getSizeDisplay()})
            </Text>
          </Group>
          <Group gap="5px">
            <ActionIcon size="md" variant="default" color="black" onClick={() => props.handleEdit(props.id)}>
              <DynamicTablerIcon name="IconPencil" size={16} />
            </ActionIcon>
            <ActionIcon size="md" variant="default" color="black" onClick={() => props.handleDelete(props.id)}>
              <DynamicTablerIcon name="IconTrash" size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </PopoverTarget>
      <PopoverDropdown>
        <Text> Summary </Text>
      </PopoverDropdown>
    </Popover>
  );
};
