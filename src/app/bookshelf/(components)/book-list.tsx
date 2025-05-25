import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { type Book } from "../types";
import { type FC } from "react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

interface BookListProps {
  books: Book[];
}

export const BookList: FC<BookListProps> = (props) => {
  return (
    <Group gap="xs">
      {props.books.map((book, i) => (
        <Stack gap={0} key={i} w={200}>
          <Box w="100%" h={250} mb="sm" bg="var(--mantine-color-purple-0)" />
          <Title order={6}>{book.title}</Title>
          <Text size="xs">{book.author}</Text>
          <Group gap="3px" my="xs">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <DynamicTablerIcon
                  key={i}
                  name={
                    i + 1 <= Math.floor(book.rating)
                      ? "IconStarFilled"
                      : book.rating > i
                        ? "IconStarHalfFilled"
                        : "IconStar"
                  }
                  size={18}
                />
              ))}
          </Group>
        </Stack>
      ))}
    </Group>
  );
};
