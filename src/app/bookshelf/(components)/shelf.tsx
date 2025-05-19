/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState, type FC } from "react";
import { Group, type KonvaNodeEvents, Label, Rect, Text } from "react-konva";
import { generateRandomBookSizes } from "../utils";
import { type BookDimensions } from "../types";

interface ShelfProps {
  parentHeight: number;
  parentWidth: number;
  width: number;
  height: number;
  shelfThickness: number;
  shelfGap: number;
}

export const Shelf: FC<ShelfProps> = (props) => {
  const theme = useMantineTheme();
  const [books, setBooks] = useState<BookDimensions[]>([]);

  const shelfSpace = props.shelfThickness + props.shelfGap;
  const numShelves = Math.floor((props.height - props.shelfThickness) / shelfSpace);
  const shelfOffset = {
    x: (props.parentWidth - props.width) / 2,
    y: (props.parentHeight - props.height) / 2,
  };

  useEffect(() => {
    setBooks(
      generateRandomBookSizes({
        amount: numShelves,
        width: props.width,
        gap: props.shelfGap,
        thickness: props.shelfThickness,
      }),
    );
  }, [props.width, props.shelfGap, props.shelfThickness, numShelves]);

  const handleDragBookStart: KonvaNodeEvents["onDragStart"] = (event) => {
    setBooks((_books) =>
      _books.map((book) => (book.id === event.target.attrs.id ? { ...book, isDragging: true } : book)),
    );
  };

  const handleDragBookMove: KonvaNodeEvents["onDragMove"] = (event) => {
    const currentBookIndex = books.findIndex((book) => book.id === event.target.attrs.id);
    const currentBook = books[currentBookIndex]!;

    const leftBookIndex =
      currentBookIndex == 0 || books[currentBookIndex - 1]!.x > currentBook.x ? currentBookIndex : currentBookIndex - 1;
    const rightBookIndex =
      currentBookIndex >= books.length - 1 ||
      books[currentBookIndex + 1]!.y + books[currentBookIndex + 1]!.height != currentBook.y + currentBook.height
        ? currentBookIndex
        : currentBookIndex + 1;

    const leftBook = books[leftBookIndex]!;
    const leftBookX = leftBook.x;
    const rightBookX = books[rightBookIndex]!.x;
    const currentPos = event.target.getPosition();

    const isDraggingLeft = leftBookIndex != currentBookIndex && currentPos.x - leftBookX < leftBook.width / 2;
    const isDraggingRight = rightBookIndex != currentBookIndex && rightBookX - currentPos.x < currentBook.width / 2;
    const bookIndexToSnap = isDraggingLeft ? leftBookIndex : isDraggingRight ? rightBookIndex : currentBookIndex;

    event.target.setPosition({
      x: books[bookIndexToSnap]!.x,
      y: currentBook.y,
    });

    if (bookIndexToSnap != currentBookIndex) {
      setBooks((_books) => {
        const newBooks = [..._books];

        const bookToSnapCopy = { ...newBooks[bookIndexToSnap]! };
        newBooks[bookIndexToSnap] = { ...newBooks[currentBookIndex]! };
        newBooks[currentBookIndex] = bookToSnapCopy;

        const smallerIndex = Math.min(bookIndexToSnap, currentBookIndex);
        const largerIndex = Math.max(bookIndexToSnap, currentBookIndex);
        for (let i = smallerIndex; i <= largerIndex; i++) {
          newBooks[i] = {
            ...newBooks[i]!,
            x:
              i == 0 || newBooks[i - 1]!.y + newBooks[i - 1]!.height != newBooks[i]!.y + newBooks[i]!.height
                ? 0
                : newBooks[i - 1]!.x + newBooks[i - 1]!.width,
          };
        }
        return newBooks;
      });
    }
  };

  const handleDragBookEnd: KonvaNodeEvents["onDragEnd"] = (event) => {
    setBooks((_books) => _books.map((book) => (book.isDragging ? { ...book, isDragging: false } : book)));
  };

  return (
    <Group width={props.width} height={props.height} x={shelfOffset.x} y={shelfOffset.y}>
      {numShelves > 0 &&
        [...Array(numShelves).keys()].map((shelf) => (
          <Rect
            key={shelf}
            fill={theme.colors.tan?.[4]}
            width={props.width}
            height={props.shelfThickness}
            x={0}
            y={shelf * shelfSpace}
            offsetY={-props.shelfGap}
            cornerRadius={5}
          />
        ))}
      <Group>
        {books.map((book) => (
          <Rect
            key={book.id}
            fill={book.isDragging ? theme.colors.beige?.[3] : theme.colors.dark[1]}
            stroke={book.isDragging ? theme.colors.beige?.[9] : theme.colors.dark[7]}
            strokeWidth={2}
            draggable={true}
            onDragStart={handleDragBookStart}
            onDragMove={handleDragBookMove}
            onDragEnd={handleDragBookEnd}
            {...book}
          />
        ))}
      </Group>
    </Group>
  );
};
