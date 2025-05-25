export interface BookPoseAndDimensions {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  isDragging: boolean;
}

export type BookStack = {
  name: string;
};

export type Book = {
  title: string;
  author: string;
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
};