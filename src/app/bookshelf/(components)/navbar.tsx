import { ActionIcon, Group, SegmentedControl } from "@mantine/core";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export type NavbarTabs = "bookshelf" | "library";

export interface NavbarProps {
  currentTab: NavbarTabs;
  onTabChange: (newTab: NavbarTabs) => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <Group gap="xs" className="absolute left-1/2 top-[25px] ml-[-144px]">
      <ActionIcon variant="subtle" size="lg" radius="xl" onClick={() => console.log("clicked sync!")}>
        <DynamicTablerIcon name="IconRefresh" color="black" />
      </ActionIcon>
      <ActionIcon variant="subtle" size="lg" radius="xl" onClick={() => console.log("clicked settings!")}>
        <DynamicTablerIcon name="IconSettings" color="black" />
      </ActionIcon>
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
