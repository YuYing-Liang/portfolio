import { type MatrixOrientation, type Matrix } from "../types";

export type Chassis = {
  id: number;
  name: string;
  frame: MatrixOrientation;
} & (
  | {
      type: "circular";
      radius: number;
    }
  | {
      type: "rectangular";
      length: number;
      width: number;
    }
  | {
      type: "triangular";
      base: number;
      height: number;
    }
);

export interface Wheel {
  id: number;
  name: string;
  frame: Matrix;
  chassis: number;
  width: number;
  length: number;
  color: string;
}

export interface Roller {
  id: number;
  wheel: number;
  frame: MatrixOrientation;
}

type Pose = [x: number, y: number, rz: number];
export interface Trajectory {
  id: number;
  name: string;
  poses: Pose[];
}
