import { Group, Stack } from "@mantine/core";
import { StackList } from "../(components)/stack-list";
import { FilterBar } from "../(components)/filter-bar";
import { BookList } from "../(components)/book-list";

export const Library = () => {
  return (
    <Group gap="lg" className="absolute left-0 top-[100px] h-[85%] w-screen items-start justify-center">
      <StackList stacks={[{ name: "Steven King Books" }, { name: "Fantasy Novels" }]} />
      <Stack className="w-[65%]">
        <FilterBar />
        <BookList
          books={[
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              rating: 1.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              rating: 0.5,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              rating: 3.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              rating: 5,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              rating: 4.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              rating: 1,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              rating: 2.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              rating: 4,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              rating: 2,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              rating: 3,
            },
          ]}
        />
      </Stack>
    </Group>
  );
};
