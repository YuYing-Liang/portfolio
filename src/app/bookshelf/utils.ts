import { v4 as uuid } from "uuid";
import { type BookDimensions } from "./types";

export const generateRandomBookSizes = (shelves: { amount: number; width: number; thickness: number; gap: number }) => {
  const BOOK_DIMENSIONS = {
    width: {
      min: 15,
      max: 40,
    },
    height: {
      min: 50,
      max: 110,
    },
  };
  const shelfSpace = shelves.thickness + shelves.gap;
  const books: BookDimensions[] = [];
  let bookY = shelves.gap;

  for (let i = 0; i < (shelves.width / BOOK_DIMENSIONS.width.min) * shelves.amount; i++) {
    const height =
      BOOK_DIMENSIONS.height.min +
      Math.floor(Math.random() * (BOOK_DIMENSIONS.height.max - BOOK_DIMENSIONS.height.min));
    const width =
      BOOK_DIMENSIONS.width.min + Math.floor(Math.random() * (BOOK_DIMENSIONS.width.max - BOOK_DIMENSIONS.width.min));

    const lastBook = books[i - 1];
    let x = i == 0 ? 0 : lastBook!.x + lastBook!.width;
    if (x + width > shelves.width) {
      x = 0;
      bookY += shelfSpace;
    }

    if (bookY / shelves.amount > shelfSpace) break;

    books.push({
      id: uuid(),
      width,
      height,
      x,
      y: bookY - height,
      isDragging: false,
    });
  }
  return books;
};
