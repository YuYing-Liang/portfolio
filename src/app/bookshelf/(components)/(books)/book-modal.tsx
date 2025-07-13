import { Box, Modal, Stack, Text, Title, Group } from "@mantine/core"
import { type FC } from "react"
import { Rating } from "./rating";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
}

export const BookModal: FC<BookModalProps> = (props) => {
  return (
    <Modal opened={props.open} onClose={props.onClose} centered size="auto">
      <Group>
        <Box w={100} h={500} bg="teal" />
        <Box w={250} h={500} bg="teal" />
        <Stack h="100%" justify="start" gap="xs">
          <Title order={3}>{"Book Title"}</Title>
          <Text>{"Author name"}</Text>
          <Group>
            <Text>{"May 2015"}</Text>
            <Text>{"325p"}</Text>
            <Rating rating={2.5} />
          </Group>
        </Stack>
      </Group>
    </Modal>
  );
};