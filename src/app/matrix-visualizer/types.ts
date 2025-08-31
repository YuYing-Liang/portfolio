import { type EulerOrder } from "three";

export type TriadColors = {
  x: string;
  y: string;
  z: string;
  sphere: string;
};
export type TriadRotation = [rx: number, ry: number, rz: number];
export type TriadPosition = [x: number, y: number, z: number];
export type TriadPose = [...TriadPosition, ...TriadRotation];

type TriadAxesColors = Omit<TriadColors, "sphere">;
export interface TriadPoseDisplayProps {
  colors: TriadAxesColors;
  editable: boolean;
  angleOrder: EulerAngleOrders;
  setTriadColors: (colors: TriadAxesColors) => void;
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

export type TriadTreeElement = {
  value: string;
  parent?: number;
  label: string;
  children: TriadTreeElement[];
};