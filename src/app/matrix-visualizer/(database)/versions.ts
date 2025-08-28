import { type Setting } from "./tables";

export const MOST_RECENT_VERSION = 3;
export const DEFAULT_SETTINGS: Record<number, Setting[]> = {
  3: [
    {
      id: 1,
      name: "Angle unit",
      type: "toggle",
      value: "rad",
      options: ["deg", "rad"],
    },
    {
      id: 2,
      name: "Grid size",
      type: "range",
      value: 1,
      min: 0.05,
      max: 1.5,
      step: 0.05,
      markers: [0.1, 0.5, 1, 1.5],
    },
    {
      id: 3,
      name: "Unit",
      type: "options",
      value: "mm",
      options: ["km", "m", "cm", "mm", "in", "ft", "yd", "mi"],
    },
    {
      id: 4,
      name: "Triad focus color",
      type: "color",
      value: "#00FFFF",
    },
    {
      id: 5,
      name: "Parent triad focus color",
      type: "color",
      value: "#C8A2C8",
    },
  ],
};