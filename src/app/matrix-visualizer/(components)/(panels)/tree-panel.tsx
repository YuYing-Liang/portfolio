import { Group, Paper, Title, Tree, Text, ActionIconGroup, ActionIcon } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { getMatrixTreeStructure } from "../../(database)/queries";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useStates3d, useTriadInfoPanelState } from "../../states";
import { Vector3 } from "three";
import { convert3DpositionTo2D } from "../../helpers";

export const TreePanel = () => {
  const matrixTreeStructure = useLiveQuery(async () => await getMatrixTreeStructure()) ?? [];
  const { camera, scene, size } = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();

  const handleClick = (triadId: number) => {
    const triadObject = scene?.getObjectByName(`triad-${triadId}`);
    if (triadObject === undefined || camera === null || size === null) return;

    const triadPositionInWorldSpace = new Vector3();
    triadObject.getWorldPosition(triadPositionInWorldSpace);
    camera.position.set(
      triadPositionInWorldSpace.x + 1.5,
      triadPositionInWorldSpace.y + 1.5,
      triadPositionInWorldSpace.z + 3,
    );
    camera.lookAt(triadPositionInWorldSpace.x, triadPositionInWorldSpace.y, triadPositionInWorldSpace.z);

    const triadPosition = triadObject.position.clone().project(camera);
    triadInfoPanelState.showTriadPanel(convert3DpositionTo2D(triadPosition, size), triadId);
  };

  return (
    <Paper className="min-w-[250px]" shadow="xs" p="sm">
      <Title order={5}>Triad Tree</Title>
      <Tree
        data={matrixTreeStructure}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group
            gap="lg"
            justify="space-between"
            className={elementProps.className}
            style={elementProps.style}
            data-selected={elementProps["data-selected"]}
            data-hovered={elementProps["data-hovered"]}
            data-value={elementProps["data-value"]}
          >
            <Group gap={2}>
              <Text>{node.label}</Text>
              {hasChildren && (
                <ActionIcon size="sm" variant="transparent" onClick={elementProps.onClick}>
                  <DynamicTablerIcon
                    name={expanded ? "IconCaretUpFilled" : "IconCaretDownFilled"}
                    size={18}
                    color="black"
                  />
                </ActionIcon>
              )}
            </Group>
            <Group gap={0}>
              <ActionIcon
                size="sm"
                variant={
                  triadInfoPanelState.visibility && triadInfoPanelState.triadId === parseInt(node.value)
                    ? "light"
                    : "transparent"
                }
                color={
                  triadInfoPanelState.visibility && triadInfoPanelState.triadId === parseInt(node.value)
                    ? "purple"
                    : "black"
                }
                onClick={() => handleClick(parseInt(node.value))}
              >
                <DynamicTablerIcon name="IconViewfinder" size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="transparent">
                <DynamicTablerIcon name="IconEye" size={16} color="black" />
              </ActionIcon>
            </Group>
          </Group>
        )}
      />
    </Paper>
  );
};
