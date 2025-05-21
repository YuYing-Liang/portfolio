/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState, type FC } from "react";
import { Group, type KonvaNodeEvents, Rect } from "react-konva";
import { generateRandomBookSizes } from "../utils";
import { type BookPoseAndDimensions } from "../types";

interface ShelfProps {
  parentHeight: number;
  parentWidth: number;
  width: number;
  height: number;
  shelfThickness: number;
  shelfGap: number;
}

export const Shelf: FC<ShelfProps> = (props) => {
  const shelfSpace = props.shelfThickness + props.shelfGap;
  const shelfOffset = {
    x: (props.parentWidth - props.width) / 2,
    y: (props.parentHeight - props.height) / 2,
  };
  const initialShelves = Math.floor((props.height - props.shelfThickness) / shelfSpace);

  const theme = useMantineTheme();
  const [books, setBooks] = useState<BookPoseAndDimensions[]>([]);
  const [numShelves, setNumShelves] = useState<number>(initialShelves);
  const [draggingBook, setDraggingBook] = useState<BookPoseAndDimensions | undefined>();

  useEffect(() => {
    setBooks(
      generateRandomBookSizes({
        amount: initialShelves,
        width: props.width,
        gap: props.shelfGap,
        thickness: props.shelfThickness,
      }),
    );
  }, [props.width, props.shelfGap, props.shelfThickness, initialShelves]);

  useEffect(() => {
    const lastBook = books.at(-1);
    if (lastBook === undefined) return;
    const numberOfShelvesNeeded = Math.ceil((lastBook.y + lastBook.height) / shelfSpace);
    if (numberOfShelvesNeeded != numShelves) {
      setNumShelves(numberOfShelvesNeeded);
    }
  }, [books, numShelves, shelfSpace]);

  const handleDragBookStart: KonvaNodeEvents["onDragStart"] = (event) => {
    const draggingBookIndex = books.findIndex((book) => book.id === event.target.attrs.id);
    setDraggingBook(books[draggingBookIndex]);
    setBooks((_books) => {
      const newBooks = [..._books];
      newBooks[draggingBookIndex]!.isDragging = true;
      return newBooks;
    });
  };

  const handleDragBookMove: KonvaNodeEvents["onDragMove"] = (event) => {
    const currentBookIndex = books.findIndex((book) => book.id === event.target.attrs.id);
    const currentBook = books[currentBookIndex]!;
    const currentPos = event.target.getPosition();
    setDraggingBook({ ...currentBook, ...currentPos } as BookPoseAndDimensions);

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

    const isAtEndOfShelf =
      currentBook.x == 0 || currentBookIndex >= books.length - 1 || books[currentBookIndex + 1]!.x == 0;
    const isDraggingUp =
      !isAtEndOfShelf && currentPos.y < currentBook.y + currentBook.height - shelfSpace - props.shelfThickness;
    const isDraggingDown = !isAtEndOfShelf && currentPos.y > currentBook.y + currentBook.height + props.shelfThickness;

    let bookIndexToSnap = currentBookIndex;

    if (isDraggingUp || isDraggingDown) {
      let distance = 100000;
      for (let i = 0; i < books.length; i++) {
        const book = books[i]!;
        if (Math.abs(book.x - currentBook.x) > 100) continue;
        const distance_between_book_and_drag = Math.pow(currentPos.x - book.x, 2) + Math.pow(currentPos.y - book.y, 2);
        if (distance_between_book_and_drag < distance) {
          bookIndexToSnap = i;
          distance = distance_between_book_and_drag;
        }
      }
    } else {
      const isDraggingLeft = leftBookIndex != currentBookIndex && currentPos.x - leftBookX < leftBook.width / 2;
      const isDraggingRight = rightBookIndex != currentBookIndex && rightBookX - currentPos.x < currentBook.width / 2;
      bookIndexToSnap = isDraggingLeft ? leftBookIndex : isDraggingRight ? rightBookIndex : currentBookIndex;
    }

    const bookToSnap = books[bookIndexToSnap]!;
    event.target.setPosition({
      x: bookToSnap.x,
      y: bookToSnap.y + bookToSnap.height - currentBook.height,
    });

    if (bookIndexToSnap != currentBookIndex) {
      setBooks((_books) => {
        const newBooks = [..._books];

        if (isDraggingUp || isDraggingDown) {
          newBooks.splice(bookIndexToSnap, 0, { ...currentBook });
          newBooks.splice(currentBookIndex + (isDraggingUp ? 1 : 0), 1);
        } else {
          const bookToSnapCopy = { ...newBooks[bookIndexToSnap]! };
          newBooks[bookIndexToSnap] = { ...newBooks[currentBookIndex]! };
          newBooks[currentBookIndex] = bookToSnapCopy;
        }

        const smallerIndex = Math.min(bookIndexToSnap, currentBookIndex);
        const largerIndex =
          isDraggingUp || isDraggingDown ? books.length - 1 : Math.max(bookIndexToSnap, currentBookIndex);
        let bookY = books[smallerIndex]!.y + books[smallerIndex]!.height;
        for (let i = smallerIndex; i <= largerIndex; i++) {
          const lastBook = newBooks[i - 1]!;
          const _currentBook = newBooks[i]!;
          let x =
            i == 0 ||
            (!isDraggingUp && !isDraggingDown && lastBook.y + lastBook.height != _currentBook.y + _currentBook.height)
              ? 0
              : lastBook.x + lastBook.width;
          if (x + _currentBook.width > props.width) {
            x = 0;
            bookY += shelfSpace;
          }
          newBooks[i] = {
            ..._currentBook,
            x,
            y: bookY - _currentBook.height,
          };
        }
        return newBooks;
      });
    }
  };

  const handleDragBookEnd: KonvaNodeEvents["onDragEnd"] = () => {
    setBooks((_books) => _books.map((book) => (book.isDragging ? { ...book, isDragging: false } : book)));
    setDraggingBook(undefined);
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
            shadowBlur={10}
            shadowColor={theme.colors.tan?.[9]}
            shadowOpacity={0.25}
            shadowOffset={{ x: 5, y: 5 }}
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
        {draggingBook !== undefined && (
          <Rect fill={theme.colors.dark[1]} stroke={theme.colors.dark[7]} strokeWidth={2} {...draggingBook} />
        )}
      </Group>
    </Group>
  );
};
