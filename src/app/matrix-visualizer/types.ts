import { type EulerOrder } from "three";

export type TriadAxisColors = {
  x: string;
  y: string;
  z: string;
  sphere: string;
};
export type TriadRotation = [rx: number, ry: number, rz: number];
export type TriadPosition = [x: number, y: number, z: number];
export type TriadPose = [...TriadPosition, ...TriadRotation];

export interface TriadPoseDisplayProps {
  colors: Omit<TriadAxisColors, "sphere">;
  editable: boolean;
  pose: TriadPose;
  angleOrder: EulerAngleOrders;
  setPose?: (pose: TriadPose) => void;
}

export type TriadPoseDisplayType = "matrix" | "euler";
export type EulerAngleOrders = "XYZ" | "ZYZ"; // EulerOrder

export type TriadPoseDisplayParams = {
  type: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
};

export type PoseLabelOptions = "x" | "y" | "z" | "rx" | "ry" | "rz";
export type PoseLabels = [
  PoseLabelOptions,
  PoseLabelOptions,
  PoseLabelOptions,
  PoseLabelOptions,
  PoseLabelOptions,
  PoseLabelOptions,
];