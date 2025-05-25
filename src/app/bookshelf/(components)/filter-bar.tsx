import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Menu,
  Pill,
  PillGroup,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

interface FilterBarProps {
  addStacks?: boolean;
}

export const FilterBar: FC<FilterBarProps> = (props) => {
  return (
    <Stack>
      <Group justify="space-between">
        <Group gap="xs">
          <TextInput placeholder="Search ..." rightSection={<DynamicTablerIcon name="IconSearch" size={18} />} />
          <Popover shadow="sm" closeOnClickOutside={false} width={250} position="bottom-start">
            <Popover.Target>
              <ActionIcon size="input-sm" variant="light">
                <DynamicTablerIcon name="IconAdjustments" size={20} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown className="p-3">
              <Stack gap="xs">
                <Text size="sm" fw={600}>
                  Filter by
                </Text>
                <Select
                  checkIconPosition="right"
                  placeholder="Select property ..."
                  data={["author", "date published", "review", "title"]}
                  clearable
                />
                <Select
                  checkIconPosition="right"
                  clearable
                  placeholder="Select operation ..."
                  data={[
                    "includes",
                    "equals",
                    "greater than",
                    "greater than or equal to",
                    "less than",
                    "less than or equal to",
                  ]}
                />
                <Button variant="subtle" size="xs" w="fit-content">
                  ➕ and/or
                </Button>
                <Select
                  checkIconPosition="right"
                  placeholder="<property> options"
                  data={["asdf", "gfddb", "fddd", "ererdf"]}
                  searchable
                  clearable
                />
                <Button variant="light" size="xs" w="fit-content" className="self-end">
                  Add Filter
                </Button>
                <Divider />
                <Text size="sm" fw={600}>
                  Order by
                </Text>
                <Select
                  checkIconPosition="right"
                  clearable
                  placeholder="Select ordering ..."
                  data={["alphabetically", "ascending", "descending", "most recent", "least recent"]}
                />
                <Button variant="light" size="xs" w="fit-content" className="self-end">
                  Add Ordering
                </Button>
                <Divider />
                <Text size="sm" fw={600}>
                  Group by
                </Text>
                <Select
                  checkIconPosition="right"
                  placeholder="Select property ..."
                  data={["author", "date published", "review", "title"]}
                  clearable
                />
                <Button variant="light" size="xs" w="fit-content" className="self-end">
                  Add Grouping
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
        <Group gap="xs">
          <ActionIcon size="input-sm" variant="light">
            <DynamicTablerIcon name="IconChartDonut" size={20} />
          </ActionIcon>
          <ActionIcon size="input-sm" variant="light">
            <DynamicTablerIcon name="IconLayout" size={20} />
          </ActionIcon>
          <Button variant="light" leftSection={<DynamicTablerIcon name="IconPlus" size={20} />}>
            {"Book"}
          </Button>
          {props.addStacks && (
            <Button variant="light" leftSection={<DynamicTablerIcon name="IconPlus" size={20} />}>
              {"Stack"}
            </Button>
          )}
        </Group>
      </Group>
      <PillGroup>
        <Pill withRemoveButton size="xl" fz="sm" bg="var(--mantine-color-purple-1)">
          {"property1: value"}
        </Pill>
        <Pill withRemoveButton size="xl" fz="sm" bg="var(--mantine-color-purple-1)">
          {"property2 ≥ value and property2 < value"}
        </Pill>
        <Pill withRemoveButton size="xl" fz="sm" bg="var(--mantine-color-purple-1)">
          {"property3 ≤ value"}
        </Pill>
        <Pill withRemoveButton size="xl" fz="sm" bg="var(--mantine-color-pink-2)">
          {"order: alphabetical"}
        </Pill>
        <Pill withRemoveButton size="xl" fz="sm" bg="var(--mantine-color-indigo-1)">
          {"group: author"}
        </Pill>
      </PillGroup>
    </Stack>
  );
};
