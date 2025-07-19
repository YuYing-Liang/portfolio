import { type EulerOrder } from "three";

export type TriadRotation = [rx: number, ry: number, rz: number];
export type TriadPose = [x: number, y: number, z: number, rx: number, ry: number, rz: number];

export interface TriadPoseDisplayProps {
  editable: boolean;
  matrixData: TriadPose;
  setMatrixData?: (matrixData: TriadPose) => void;
}

export type TriadPoseDisplayType = "matrix" | "euler";
export type EulerAngleOrders = EulerOrder | "ZYZ";

export type TriadPoseDisplayParams = {
  type: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
};
