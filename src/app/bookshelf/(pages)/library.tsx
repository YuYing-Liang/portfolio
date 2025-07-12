import { Group, Stack } from "@mantine/core";
import { StackList } from "../(components)/(stacks)/stack-list";
import { FilterBar } from "../(components)/(stacks)/filter-bar";
import { BookList } from "../(components)/(stacks)/book-list";

export const Library = () => {
  return (
    <Group gap="lg" className="absolute left-0 top-[125px] h-[calc(100%-125px)] w-[100%] items-start justify-center">
      <StackList
        stacks={[
          { id: "1", name: "Steven King Books" },
          { id: "2", name: "Fantasy Novels" },
        ]}
      />
      <Stack className="w-[65%]">
        <FilterBar />
        <BookList
          books={[
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              audience_rating: 1.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              audience_rating: 0.5,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              audience_rating: 3.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              audience_rating: 5,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              audience_rating: 4.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              audience_rating: 1,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              audience_rating: 2.5,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              audience_rating: 4,
            },
            {
              title: "Almond",
              author: "Sohn Won-pyung",
              audience_rating: 2,
            },
            {
              title: "Little Fires Everywhere",
              author: "Celest Ng",
              audience_rating: 3,
            },
          ]}
        />
      </Stack>
    </Group>
  );
};
