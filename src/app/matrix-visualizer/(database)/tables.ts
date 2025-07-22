import { type TriadAxisColors, type TriadPose } from "../types";

export interface Matrix {
  name: string;
  parent?: number;
  pose: TriadPose; // [x, y, z, rx, ry, rz]
  colors: TriadAxisColors
}

export interface MatrixWithId extends Matrix {
  id: number;
}
