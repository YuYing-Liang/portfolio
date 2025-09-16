import { type DynamicIconProps } from "../(components)/Icon";
import { type Chassis } from "./(database)/tables";

export const CHASSIS_TYPE_TO_ICON_MAP: Record<Chassis["type"], DynamicIconProps["name"]> = {
  circular: "IconCircle",
  rectangular: "IconRectangle",
  triangular: "IconTriangle",
};

export const PAGES = ["configure", "simulate"] as const;
export type Pages = (typeof PAGES)[number];

export const MAX_CHASSIS_SIZE_BUFFER = 100;