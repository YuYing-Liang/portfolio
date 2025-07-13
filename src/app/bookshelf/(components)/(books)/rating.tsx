import { type FC } from "react";
import { Group } from "@mantine/core";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { type BookRating } from "../../types";

interface RatingProps {
  rating: BookRating;
}

// TODO: replace with Mantine Rating: https://mantine.dev/core/rating/
export const Rating: FC<RatingProps> = (props) => {
  return (
    <Group gap="3px" my="xs">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <DynamicTablerIcon
            key={i}
            name={
              i + 1 <= Math.floor(props.rating)
                ? "IconStarFilled"
                : props.rating > i
                  ? "IconStarHalfFilled"
                  : "IconStar"
            }
            size={18}
          />
        ))}
    </Group>
  );
};
