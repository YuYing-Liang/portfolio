import { ActionIcon, Button, Group, Input, Stack } from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

interface FilterBarProps {
  addStacks?: boolean;
}

export const FilterBar: FC<FilterBarProps> = (props) => {
  return (
    <Stack w="100%">
      <Group w="100%" justify="space-between">
        <Group gap="xs">
          <Input placeholder="Search ..." rightSection={<DynamicTablerIcon name="IconSearch" size={18} />} />
          <ActionIcon size="input-sm" variant="light" >
            <DynamicTablerIcon name="IconAdjustments" size={20}/>
          </ActionIcon>
        </Group>
        <Group gap="xs">
          <ActionIcon size="input-sm" variant="light">
            <DynamicTablerIcon name="IconChartDonut" size={20}/>
          </ActionIcon>
          <ActionIcon size="input-sm" variant="light">
            <DynamicTablerIcon name="IconLayout" size={20}/>
          </ActionIcon>
          <Button variant="light" leftSection={<DynamicTablerIcon name="IconPlus" size={20}/>}>
            {"Book"}
          </Button>
          {props.addStacks && (
            <Button variant="light" leftSection={<DynamicTablerIcon name="IconPlus" size={20}/>}>
              {"Stack"}
            </Button>
          )}
        </Group>
      </Group>
    </Stack>
  );
};
