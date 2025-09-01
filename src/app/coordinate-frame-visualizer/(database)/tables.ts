import { type TriadColors, type TriadPose } from "../types";

export interface Matrix {
  name: string;
  parent?: number;
  pose: TriadPose;
  colors: TriadColors;
}

export interface MatrixWithId extends Matrix {
  id: number;
}

export type Setting = {
  id: number;
  name: string;
} & (
  | {
      type: "toggle";
      value: boolean | string;
      options?: [string, string];
    }
  | {
      type: "options";
      value: string;
      options: string[];
    }
  | {
      type: "text";
      value: string;
    }
  | {
      type: "number";
      value: number;
    }
  | {
      type: "color";
      value: string;
    }
  | {
      type: "range";
      value: number;
      min: number;
      max: number;
      step?: number;
      markers?: number[];
    }
);
