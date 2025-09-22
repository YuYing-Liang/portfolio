import { IndexableType } from "dexie";
import { type Matrix, type MatrixOrientation } from "./types";

/**
 * Calculates rotation about the z axis from the given matrix
 * @param matrix either a 2x2 or 3x3 matrix
 * @returns The rotation in radians mapped between -Math.PI to Math.PI
 */
export const getRotationFromMatrix = (matrix: Matrix | MatrixOrientation): number => {
  const angleCos = Math.acos(matrix[0]);
  const angleSine = Math.asin(-matrix[1]);

  if (angleCos >= 0) {
    if (angleSine <= 0) {
      return angleSine;
    }
    return angleCos;
  }

  if (angleSine > 0) {
    return Math.PI - angleSine;
  }

  return -Math.PI - angleSine;
};

/**
 * Get matrix from rotation
 * @param rotation rotation about z in radians
 * @returns Matrix (2x2)
 */
export const getMatrixFromRotation = (rotation: number): MatrixOrientation => {
  // prettier-ignore
  return [
    Math.cos(rotation), -Math.sin(rotation),
    Math.sin(rotation), Math.cos(rotation),
  ]
};

export const getSizeBasedOnGridUnits = (pixelSize: number, gridUnitSize: number): number => {
  return Number((pixelSize / gridUnitSize).toFixed(2));
};

export const roundToNearestGridUnit = (pixelValue: number, gridUnitSize: number): number => {
  return Math.round(pixelValue / gridUnitSize) * gridUnitSize;
};

export const getDefaultName = (name: string, chassisNames: string[]) => {
  let defaultName = name;
  let counter = 1;
  while (chassisNames.includes(defaultName)) {
    defaultName = `${name} (${counter})`;
    counter++;
  }
  return defaultName;
};
