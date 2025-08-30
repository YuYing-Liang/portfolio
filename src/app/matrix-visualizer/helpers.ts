import { type Size } from "@react-three/fiber";
import { type TriadRotation, type EulerAngleOrders, type TriadPose, type TriadPosition } from "./types";
import { Matrix4, Euler, type Matrix4Tuple, Quaternion, Vector3, type Object3D, Scene, Mesh } from "three";
import { BASE_FRAME_MATRIX } from "./constants";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44] = matrixTuple;
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

export const convert3DpositionTo2D = (vector3d: Vector3, canvasSize: Size): [number, number] => {
  return [((vector3d.x + 1) / 2) * canvasSize.width, ((1 - vector3d.y) / 2) * canvasSize.height];
};

export const getWorldMatrix = (object: Object3D): Matrix4 => {
  const selectedTriadWorldPosition = new Vector3();
  const selectedTriadWorldQuaternion = new Quaternion();
  object.getWorldPosition(selectedTriadWorldPosition);
  object.getWorldQuaternion(selectedTriadWorldQuaternion);
  const selectedTriadWorldEuler = new Euler().setFromQuaternion(selectedTriadWorldQuaternion, "XYZ");
  const selectedTriadWorldMatrix = convertEulerPoseToMatrix(
    [
      ...selectedTriadWorldPosition.toArray(),
      selectedTriadWorldEuler.x,
      selectedTriadWorldEuler.y,
      selectedTriadWorldEuler.z,
    ],
    "XYZ",
  );
  return new Matrix4(...selectedTriadWorldMatrix);
};

export const isParentBase = (parentId?: number) => {
  return parentId === undefined || parentId === BASE_FRAME_MATRIX.id;
};

export const getTriadMeshes = (scene: Scene | null, triadId: number) => {
  const objects = scene?.getObjectByName(`triad-${triadId}`);
  return objects?.children.flatMap((object) => (object instanceof Mesh ? object : object.children));
};

export const convertDegressToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const convertRadiansToDegrees = (radians: number) => {
  return radians * (180 / Math.PI);
};

export const convertPoseToDegrees = (pose: TriadPose | undefined, angleSetting: string) => {
  return roundArray(
    pose?.map((poseElement, poseIndex) =>
      poseIndex >= 3 && angleSetting === "deg" ? convertRadiansToDegrees(poseElement) : poseElement,
    ) ?? [],
    2,
  );
};
