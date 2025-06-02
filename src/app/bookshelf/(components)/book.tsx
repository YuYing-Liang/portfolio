import { Box, Modal, Stack, Text, Title, Group } from "@mantine/core"
import { type FC } from "react"

interface BookModalProps {
  open: boolean,
  onClose: () => void
}

export const BookModal: FC<BookModalProps> = (props) => {
  return (
    <Modal opened={props.open} onClose={props.onClose} centered size="auto">
      <Group>
        <Box w={100} h={500} bg="teal"/>
        <Box w={250} h={500} bg="teal"/>
        <Stack h="100%" justify="start">
          <Title order={3}>{"Book Title"}</Title>
          <Text>{"Author name"}</Text>
          <Group>
            <Text>{"May 2015"}</Text>
            <Text>{"May 2015"}</Text>

          </Group>
        </Stack>
      </Group>
    </Modal>
  )
}