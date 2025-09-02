import { DynamicIconProps } from "../(components)/Icon";
import { Chassis } from "./(database)/tables";

export const CHASSIS_TYPE_TO_ICON_MAP: Record<Chassis["type"], DynamicIconProps["name"]> = {
  circular: "IconCircle",
  rectangular: "IconRectangle",
  triangular: "IconTriangle",
};

export const PAGES = ["Configure", "Simulate"] as const;
export type Pages = (typeof PAGES)[number];
