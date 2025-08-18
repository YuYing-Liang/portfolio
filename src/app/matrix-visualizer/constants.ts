import { type MatrixWithId } from "./(database)/tables";

export const DEFAULT_AXIS_COLORS = {
  x: "red",
  y: "green",
  z: "blue",
  sphere: "lightblue",
};

export const BASE_FRAME_MATRIX: MatrixWithId = {
  id: 0,
  colors: DEFAULT_AXIS_COLORS,
  name: "Base Frame",
  pose: [0, 0, 0, 0, 0, 0],
};
