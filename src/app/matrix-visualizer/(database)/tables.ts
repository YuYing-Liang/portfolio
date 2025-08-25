import { type TriadColors, type TriadPose } from "../types";

export interface Matrix {
  name: string;
  parent?: number;
  pose: TriadPose; // [x, y, z, rx, ry, rz]
  colors: TriadColors;
}

export interface MatrixWithId extends Matrix {
  id: number;
}
