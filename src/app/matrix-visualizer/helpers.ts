import { type TriadRotation, type EulerAngleOrders, type TriadPose, type TriadPosition } from "./types";
import { Matrix4, Euler, type Matrix4Tuple, Quaternion } from "three";

export const convertEulerPoseToMatrix = (pose: TriadPose, angleOrder: EulerAngleOrders): Matrix4Tuple => {
  const [x, y, z, alpha, beta, gamma] = pose;
  const matrix = new Matrix4();

  if (angleOrder === "ZYZ") {
    const [rx, ry, rz] = convert_ZYZ_to_XYZ([alpha, beta, gamma]);
    matrix.makeRotationFromEuler(new Euler(rx, ry, rz, "XYZ"));
  } else {
    matrix.makeRotationFromEuler(new Euler(alpha, beta, gamma, angleOrder));
  }
  matrix.setPosition(x, y, z);

  return roundArray<Matrix4Tuple>(matrix.toArray(), 4);
};

export const convertMatrixToEulerPose = (matrixTuple: Matrix4Tuple, angleOrder: EulerAngleOrders): TriadPose => {
  const matrix = new Matrix4();
  const euler = new Euler();

  matrix.set(...matrixTuple);

  const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44] = matrix.elements;
  const position: TriadPosition = [m14, m24, m34];

  if (angleOrder === "ZYZ") {
    if (Math.abs(m33 - 1.0) < 0.01) {
      return [...position, 0, 0, Math.atan2(m12, m11)];
    }
    if (Math.abs(m33 + 1.0) < 0.01) {
      return [...position, 0, Math.PI, Math.atan2(-m12, -m11)];
    }
    return [...position, Math.atan2(m23, m13), Math.acos(m33), Math.atan2(m32, -m31)];
  }

  euler.setFromRotationMatrix(matrix, angleOrder);
  const eulerAngles = euler.toArray();
  return [...position, eulerAngles[0], eulerAngles[1], eulerAngles[2]];
};

export const convert_ZYZ_to_XYZ = (zyzRotation: TriadRotation): TriadRotation => {
  const [rz1, ry, rz2] = zyzRotation;

  const q1 = new Quaternion().setFromAxisAngle(new Euler(0, 0, 1), rz1);
  const q2 = new Quaternion().setFromAxisAngle(new Euler(0, 1, 0), ry);
  const q3 = new Quaternion().setFromAxisAngle(new Euler(0, 0, 1), rz2);

  const combinedQuaternion = q1.multiply(q2).multiply(q3);
  const euler = new Euler().setFromQuaternion(combinedQuaternion, "XYZ");

  return [euler.x, euler.y, euler.z];
};

export const roundArray = <T extends number[]>(array: T, precision = 2): T => {
  return array.map((element: number) => Number(element.toFixed(precision))) as T;
};