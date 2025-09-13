import { ActionIcon, Button, Group, Paper, Popover, PopoverDropdown, PopoverTarget, Stack, Text } from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useDisclosure } from "@mantine/hooks";
import { type Chassis } from "../../../(database)/tables";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../../../constants";

export const ChassisListPanel = () => {
  const chassisList: Chassis[] = [
    {
      id: 0,
      name: "Chassis 1",
      frame: [1, 0, 0, 1],
      type: "circular",
      radius: 5,
    },
    {
      id: 1,
      name: "Chassis 2",
      frame: [1, 0, 0, 1],
      type: "rectangular",
      width: 3,
      length: 4,
    },
    {
      id: 2,
      name: "Chassis 3",
      frame: [1, 0, 0, 1],
      type: "triangular",
      base: 2,
      height: 2,
    },
    {
      id: 3,
      name: "Chassis 4",
      frame: [1, 0, 0, 1],
      type: "rectangular",
      width: 5,
      length: 5,
    },
  ];

  return (
    <Paper shadow="xs" p="xs">
      <Text size="md" fw={700}>
        {"Chassis List"}
      </Text>
      <Stack gap="xs" mt="sm">
        {chassisList.map((chassis) => (
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          <ChassisListElement key={chassis.id} {...chassis} handleClick={() => {}} />
        ))}
        <Button
          classNames={{
            root: "self-end",
            section: "m-[5px]",
          }}
          variant="light"
          type="submit"
          leftSection={<DynamicTablerIcon name="IconBoxModel" size={16} />}
        >
          Add Chassis
        </Button>
      </Stack>
    </Paper>
  );
};

type ChassisButtonProps = {
  handleClick: (chassisId: number) => void;
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
            <ActionIcon size="md" variant="default" color="black">
              <DynamicTablerIcon name="IconPencil" size={16} />
            </ActionIcon>
            <ActionIcon size="md" variant="default" color="black">
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
