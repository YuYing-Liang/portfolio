export interface Matrix {
  name: string;
  parent?: number;
  pose: [number, number, number, number, number, number], // [x, y, z, rx, ry, rz]
  colors: [string, string, string, string] // [x axis, y axis, z axis, origin sphere]
}

export interface MatrixWithId extends Matrix {
  id: number;
}