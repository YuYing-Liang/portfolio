import { type EulerOrder } from "three";

export type TriadAxisColors = {
  x: string;
  y: string;
  z: string;
  sphere: string;
}
export type TriadRotation = [rx: number, ry: number, rz: number];
export type TriadPosition = [x: number, y: number, z: number];
export type TriadPose = [...TriadPosition, ...TriadRotation];

export interface TriadPoseDisplayProps {
  colors: Omit<TriadAxisColors, "sphere">;
  editable: boolean;
  pose: TriadPose;
  setPose?: (pose: TriadPose) => void;
}

export type TriadPoseDisplayType = "matrix" | "euler";
export type EulerAngleOrders = EulerOrder | "ZYZ";

export type TriadPoseDisplayParams = {
  type: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
};
