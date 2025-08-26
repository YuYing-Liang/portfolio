import { Paper, Title, Tree } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { getMatrixTreeStructure } from "../../(database)/queries";

export const TreePanel = () => {
  const matrixTreeStructure = useLiveQuery(async () => await getMatrixTreeStructure()) ?? [];

  return (
    <Paper className="absolute right-[25px] top-[25px] w-[250px]" shadow="xs" p="sm">
      <Title order={5}>Triad Tree</Title>
      <Tree
        data={matrixTreeStructure}
        levelOffset={23}
        // renderNode={({ node, expanded, hasChildren, elementProps, level }) => (
        //   <Group gap={5} {...elementProps}>
        //     <DynamicTablerIcon
        //       name={hasChildren ? "IconAutomaticGearbox" : "IconMatrix"}
        //       size={18}
        //       color={(expanded && hasChildren) || level > 1 ? "#6A47C2" : "black"}
        //     />
        //     <Text c={(expanded && hasChildren) || level > 1 ? "#6A47C2" : "black"}>{node.label}</Text>
        //   </Group>
        // )}
      />
    </Paper>
  );
};
