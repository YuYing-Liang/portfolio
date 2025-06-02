import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Pill,
  PillGroup,
  Popover,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export const FilterBar = () => {
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
                  placeholder="Select property ..."
                  data={["author", "date published", "review", "title"]}
                  clearable
                />
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

          <Popover shadow="sm" closeOnClickOutside={false} width={250} position="bottom-start">
            <Popover.Target>
              <ActionIcon size="input-sm" variant="light">
                <DynamicTablerIcon name="IconChartDonut" size={20} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown className="p-3">
              <Stack gap="xs">
                <Text size="sm" fw={600}>
                  Add Statistic
                </Text>
                <Select
                  label="Property"
                  checkIconPosition="right"
                  placeholder="Select property ..."
                  data={["author", "date published", "review", "title"]}
                  clearable
                />
                <Select
                  label="Operation"
                  checkIconPosition="right"
                  clearable
                  placeholder="Select operation ..."
                  data={["average", "sum", "range"]}
                />
                <Select
                  label="Grouped by"
                  checkIconPosition="right"
                  clearable
                  placeholder="Grouped by ..."
                  data={["author", "date published", "review", "title"]}
                />
                <Select
                  label="Ordered by"
                  checkIconPosition="right"
                  clearable
                  placeholder="Order by ..."
                  data={["alphabetically", "ascending", "descending", "most recent", "least recent"]}
                />
                <Select
                  label="Display method"
                  checkIconPosition="right"
                  placeholder="Display method"
                  data={["text", "icon", "pie chart", "bar chart", "scale"]}
                  searchable
                  clearable
                />
                <Button variant="light" size="xs" w="fit-content" className="self-end">
                  Add Stat
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
        <SegmentedControl
          size="sm"
          radius="md"
          defaultValue="grid"
          data={[
            { label: <DynamicTablerIcon name="IconLayoutGrid" size={20} />, value: "grid" },
            { label: <DynamicTablerIcon name="IconLayoutList" size={20} />, value: "list" },
          ]}
        />
      </Group>
      <Stack gap="5px">
        <PillGroup gap={3}>
          <Pill withRemoveButton size="lg" fz="xs" bg="var(--mantine-color-purple-1)" radius="sm">
            <strong>{"property1"}</strong>
            {": value"}
          </Pill>
          <Pill withRemoveButton size="lg" fz="xs" bg="var(--mantine-color-purple-1)" radius="sm">
            <strong>{"property2"}</strong>
            {" ≥ value and "}
            <strong>{"property2"}</strong>
            {" < value"}
          </Pill>
          <Pill withRemoveButton size="lg" fz="xs" bg="var(--mantine-color-purple-1)" radius="sm">
            <strong>{"property3"}</strong>
            {" ≤ value"}
          </Pill>
        </PillGroup>
        <PillGroup gap={3}>
          <Pill withRemoveButton size="lg" fz="xs" bg="var(--mantine-color-pink-2)" radius="sm">
            <strong>{"order"}</strong>
            {": alphabetical"}
          </Pill>
        </PillGroup>
        <PillGroup gap={3}>
          <Pill withRemoveButton size="lg" fz="xs" bg="var(--mantine-color-indigo-1)" radius="sm">
            <strong>{"group"}</strong>
            {": author"}
          </Pill>
        </PillGroup>
      </Stack>
    </Stack>
  );
};
