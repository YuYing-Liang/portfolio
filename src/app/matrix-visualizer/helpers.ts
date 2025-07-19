import { type TriadRotation, type EulerAngleOrders, type TriadPose } from "./types";
import { Matrix4, Euler, type Matrix4Tuple, Quaternion } from "three";

export const convertEulerPoseToMatrix = (pose: TriadPose, angleOrder: EulerAngleOrders ): Matrix4Tuple => {
  const [x, y, z, alpha, beta, gamma] = pose;
  const matrix = new Matrix4();
  
  matrix.setPosition(x, y, z);
  
  if (angleOrder === "ZYZ") {
    const [rx, ry, rz] = convert_ZYZ_to_XYZ([alpha, beta, gamma]);
    matrix.makeRotationFromEuler(new Euler(rx, ry, rz, "XYZ"));
  } else {
    matrix.makeRotationFromEuler(new Euler(alpha, beta, gamma, angleOrder));
  }
  
  return matrix.toArray();
}

export const convert_ZYZ_to_XYZ = (zyzRotation: TriadRotation): TriadRotation => {
  const [rz1, ry, rz2] = zyzRotation;

  const q1 = new Quaternion().setFromAxisAngle(new Euler(0, 0, 1), rz1);
  const q2 = new Quaternion().setFromAxisAngle(new Euler(0, 1, 0), ry);
  const q3 = new Quaternion().setFromAxisAngle(new Euler(0, 0, 1), rz2);

  const combinedQuaternion = q1.multiply(q2).multiply(q3);
  const euler = new Euler().setFromQuaternion(combinedQuaternion, "XYZ");

  return [euler.x, euler.y, euler.z];
}