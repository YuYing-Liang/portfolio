// prettier-ignore
type MatrixOrientation = [
  r11: number, r12: number,
  r21: number, r22: number
];

// prettier-ignore
type Matrix = [
  r11: number, r12: number, r13: number,
  r21: number, r22: number, r23: number,
  r31: 0, r32: 0, r33: 1
];

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

export interface Trajectory {
  id: number;
  name: string;
  poses: number[]; // order of poses, ids in this list
}

export interface TrajectoryPose {
  id: number;
  pose: [x: number, y: number, rz: number];
}
