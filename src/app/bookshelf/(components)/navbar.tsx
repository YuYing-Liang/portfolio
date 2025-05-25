import { ActionIcon, Group, Menu, SegmentedControl } from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export type NavbarTabs = "bookshelf" | "library";

export interface NavbarProps {
  currentTab: NavbarTabs;
  onTabChange: (newTab: NavbarTabs) => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <Group gap="xs" className="absolute left-1/2 top-[25px] ml-[-165px]">
      <ActionIcon variant="subtle" size="lg" radius="xl" onClick={() => console.log("clicked sync!")}>
        <DynamicTablerIcon name="IconRefresh" color="black" />
      </ActionIcon>
      <ActionIcon variant="subtle" size="lg" radius="xl" onClick={() => console.log("clicked settings!")}>
        <DynamicTablerIcon name="IconSettings" color="black" />
      </ActionIcon>
      <Menu shadow="lg">
        <Menu.Target>
          <ActionIcon variant="subtle" size="lg" radius="xl" onClick={() => console.log("clicked add!")}>
            <DynamicTablerIcon name="IconPlus" color="black" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<DynamicTablerIcon name="IconBook2" size={20} />}> Add Book </Menu.Item>
          <Menu.Item leftSection={<DynamicTablerIcon name="IconStack2" size={20} />}> Add Stack </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <SegmentedControl
        withItemsBorders={false}
        size="md"
        radius="xl"
        value={props.currentTab}
        onChange={(value) => props.onTabChange(value as NavbarTabs)}
        data={[
          { label: "Bookshelf", value: "bookshelf" },
          { label: "Library", value: "library" },
        ]}
      />
    </Group>
  );
};
