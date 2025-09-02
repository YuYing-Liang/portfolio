import { ActionIcon, ActionIconGroup, Button, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import { DynamicIconProps, DynamicTablerIcon } from "~/app/(components)/Icon";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../constants";

export const ChassisSelectorPanel = () => {
  return (
    <Paper shadow="xs" p="xs">
      <Group align="end" gap="xs">
        <Text size="md" fw={700}>
          {"New Chassis Type"}
        </Text>
        <ActionIconGroup>
          {Object.entries(CHASSIS_TYPE_TO_ICON_MAP).map(([type, icon], i) => (
            <ChassisButton key={i} icon={icon} text={type} />
          ))}
        </ActionIconGroup>
      </Group>
    </Paper>
  );
};

interface ChassisButtonProps {
  icon: DynamicIconProps["name"];
  text: string;
}

const ChassisButton: FC<ChassisButtonProps> = (props) => (
  <Tooltip label={props.text}>
    <ActionIcon variant="light" size="lg">
      <DynamicTablerIcon name={props.icon} size={18} />
    </ActionIcon>
  </Tooltip>
);
