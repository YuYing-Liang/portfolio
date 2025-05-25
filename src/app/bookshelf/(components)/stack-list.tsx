import { Stack, Title, Text, Button, UnstyledButton } from "@mantine/core";
import { type FC } from "react";
import { type BookStack } from "../types";

interface StackListProps {
  stacks: BookStack[];
}

export const StackList: FC<StackListProps> = (props) => {
  return (
    <Stack px="lg" py="md" bg="var(--mantine-color-purple-0)" className="rounded-[5px] max-w-md min-h-[250px]">
      <Title order={5}>{"Stacks"}</Title>
      <UnstyledButton>{"All Books (default)"}</UnstyledButton>
      {props.stacks.map((stack) => (
        <UnstyledButton key={stack.name}>{stack.name}</UnstyledButton>
      ))}
    </Stack>
  );
};
