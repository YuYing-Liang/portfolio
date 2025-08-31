import { type Matrix, type MatrixWithId } from "./(database)/tables";
import { type PoseLabels, type EulerAngleOrders, type TriadPoseDisplayParams } from "./types";

export const DEFAULT_AXIS_COLORS = {
  x: "#FF0000",
  y: "#00FF00",
  z: "#0000FF",
  sphere: "#ADD8E6",
};

export const BASE_FRAME_MATRIX: MatrixWithId = {
  id: 0,
  colors: DEFAULT_AXIS_COLORS,
  name: "Base Frame",
  pose: [0, 0, 0, 0, 0, 0],
};

export const EULER_POSE_LABELS: Record<EulerAngleOrders, PoseLabels> = {
  XYZ: ["x", "y", "z", "rx", "ry", "rz"],
  ZYZ: ["x", "y", "z", "rz", "ry", "rz"],
};

export const UNIT_OPTIONS = ["km", "m", "cm", "mm", "in", "ft", "yd", "mi"] as const;

export type UnitOptions = (typeof UNIT_OPTIONS)[number];
export const UNIT_RATIOS: Record<UnitOptions, number> = {
  km: 0.000001,
  m: 0.001,
  cm: 0.1,
  mm: 1,
  in: 0.0393701,
  ft: 0.00328084,
  yd: 0.00109361,
  mi: 0.0000006214,
};

export const DEFAULT_TRIAD_FOCUS_COLOR = "#00FFFF";
export const DEFAULT_PARENT_TRIAD_HIGHLIGHT_COLOR = "#C8A2C8";
