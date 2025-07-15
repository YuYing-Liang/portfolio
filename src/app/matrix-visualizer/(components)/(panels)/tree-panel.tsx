import { getTreeExpandedState, Group, Paper, Text, Title, Tree, useTree } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export const TreePanel = () => {
  const treeData = [
    {
      value: "base matrix id",
      label: "base matrix",
    },
    {
      value: "matrix id",
      label: "matrix name",
      children: [
        { value: "child matrix 1", label: "child matrix 1" },
        { value: "child matrix 2", label: "child matrix 2" },
      ],
    },
  ];
  const treeState = useTree({
    initialExpandedState: getTreeExpandedState(treeData, "*"),
  });

  return (
    <Paper className="absolute right-[25px] top-[25px] w-[250px]" shadow="xs" p="sm">
      <Title order={5}>Triad Tree</Title>
      <Tree
        data={treeData}
        tree={treeState}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps, level }) => (
          <Group gap={5} {...elementProps}>
            <DynamicTablerIcon
              name={hasChildren ? "IconAutomaticGearbox" : "IconMatrix"}
              size={18}
              color={(expanded && hasChildren) || level > 1 ? "#6A47C2" : "black"}
            />
            <Text c={(expanded && hasChildren) || level > 1 ? "#6A47C2" : "black"}>{node.label}</Text>
          </Group>
        )}
      />
    </Paper>
  );
};
