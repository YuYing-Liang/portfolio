import { Popover, ActionIcon, Button, Group, Text } from "@mantine/core";
import { type FC, useState } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { deleteMatrix } from "../../(database)/queries";

interface DeleteButtonProps {
  triadId: number;
  hasChildren: boolean;
}

export const DeleteButton: FC<DeleteButtonProps> = (props) => {
  const [showDeletePopover, setShowDeletePopover] = useState<boolean>(false);

  const handleDeleteTriad = (id: number) => async () => {
    await deleteMatrix(id);
  };

  return (
    <Popover width={150} trapFocus position="bottom" withArrow offset={2} opened={showDeletePopover}>
      <Popover.Target>
        <ActionIcon
          size="sm"
          variant="transparent"
          color="black"
          disabled={props.hasChildren}
          onClick={() => setShowDeletePopover(!showDeletePopover)}
        >
          <DynamicTablerIcon name="IconTrash" size={16} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <Text size="xs">{"Are you sure you want to delete this triad?"}</Text>
        <Group gap="5px" mt="xs">
          <Button size="compact-xs" variant="default" onClick={() => setShowDeletePopover(false)}>
            {"No"}
          </Button>
          <Button size="compact-xs" variant="light" onClick={handleDeleteTriad(props.triadId)}>
            {"Yes"}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
