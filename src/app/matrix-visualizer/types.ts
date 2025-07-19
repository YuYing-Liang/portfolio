import { type Matrix } from "./(database)/tables";

export type TriadPose = [x: number, y: number, z: number, rx: number, ry: number, rz: number];

export interface TriadPoseDisplayProps {
  editable: boolean;
  matrixData: TriadPose;
  setMatrixData?: (matrixData: TriadPose) => void;
}

export type TriadPoseDisplayType = "matrix" | "euler";
export type EulerAngleOrders = "xyz" | "zyz";

export type TriadPoseDisplayParams = {
  type: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
};

export type TriadPropertiesForm = Pick<Matrix, "colors" | "name" | "parent">;
