import { Group, Paper, Title, Tree, Text, ActionIcon } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { getMatrixTreeStructure } from "../../(database)/queries";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { useStates3d, useTriadInfoPanelState } from "../../states";
import { DeleteButton } from "../(common)/delete-button";
import { lookAtTriad } from "../../helpers";

export const TreePanel = () => {
  const matrixTreeStructure = useLiveQuery(async () => await getMatrixTreeStructure()) ?? [];
  const { camera, scene, size } = useStates3d();
  const triadInfoPanelState = useTriadInfoPanelState();

  const handleFocusTriad = (triadId: number) => {
    const triadObject = scene?.getObjectByName(`triad-${triadId}`);
    if (triadObject === undefined || camera === null || size === null) return;
    lookAtTriad(triadObject, camera);
    triadInfoPanelState.showTriadPanel(triadId);
  };

  const handleShowTriadChildren = (triadId: number) => {
    const triadObject = scene?.getObjectByName(`triad-${triadId}`);
    if (triadObject === undefined || camera === null || size === null) return;
    lookAtTriad(triadObject, camera);
    triadInfoPanelState.showTriadPanel(triadId, true);
  };

  return (
    <Paper className="min-w-[250px]" shadow="xs" p="sm">
      <Title order={5}>Triad Tree</Title>
      {matrixTreeStructure.length > 0 ? (
        <Tree
          data={matrixTreeStructure}
          levelOffset={23}
          renderNode={({ node, expanded, hasChildren, elementProps }) => {
            const triadId = parseInt(node.value);
            const isTriadSelected = triadInfoPanelState.triadId === triadId;
            const isFocusOnTriad = isTriadSelected && !triadInfoPanelState.showChildren;
            const isShowingTriadChildren = isTriadSelected && triadInfoPanelState.showChildren;
            return (
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
                    variant={isFocusOnTriad ? "light" : "transparent"}
                    color={isFocusOnTriad ? "purple" : "black"}
                    onClick={() => handleFocusTriad(triadId)}
                  >
                    <DynamicTablerIcon name="IconViewfinder" size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    disabled={!hasChildren}
                    variant={isShowingTriadChildren ? "light" : "transparent"}
                    color={isShowingTriadChildren ? "purple" : "black"}
                    onClick={() => handleShowTriadChildren(triadId)}
                  >
                    <DynamicTablerIcon name="IconTournament" size={16} />
                  </ActionIcon>
                  <DeleteButton hasChildren={hasChildren} triadId={triadId} />
                </Group>
              </Group>
            );
          }}
        />
      ) : (
        <Text size="sm">{"You have no triad's created"}</Text>
      )}
    </Paper>
  );
};
