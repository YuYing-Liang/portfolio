import { type TriadPose } from "../types";

export interface Matrix {
  name: string;
  parent?: number;
  pose: TriadPose; // [x, y, z, rx, ry, rz]
  colors: [x: string, y: string, z: string, origin: string]; // [x axis, y axis, z axis, origin sphere]
}

export interface MatrixWithId extends Matrix {
  id: number;
}
