import { type Matrix, type MatrixOrientation } from "./types";

/**
 * Calculates rotation about the z axis from the given matrix
 * @param matrix either a 2x2 or 3x3 matrix
 * @returns The rotation in radians mapped between -Math.PI to Math.PI
 */
export const getRotationFromMatrix = (matrix: Matrix | MatrixOrientation): number => {
  const cos = matrix[0];
  const sin = -matrix[1];
  const angleCos = Math.acos(cos);
  const angleSin = Math.asin(sin);


  if (cos >= 0  && sin >= 0) {
    return angleCos;
  }

  if (cos >= 0 && sin <= 0) {
    return angleSin;
  }

  return Math.PI - angleSin;
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
  return roundNumber(pixelSize / gridUnitSize);
};

export const roundToNearestGridUnit = (pixelValue: number, gridUnitSize: number): number => {
  return Math.round(pixelValue / gridUnitSize) * gridUnitSize;
};

export const radiansToDegrees = (radians: number) => {
  return (radians * 180) / Math.PI;
};

export const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const roundNumber = (a: number, decimalPlaces = 2) => {
  return Number(a.toFixed(decimalPlaces));
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
