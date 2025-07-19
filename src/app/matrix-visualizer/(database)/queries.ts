import { db } from "./db";
import type { Matrix } from "./tables";

export const addMatrix = async (matrix: Matrix) => {
  return await db.matrices.add(matrix);
};

export const getMatrix = async (id: number) => {
  return await db.matrices.get(id);
};

export const updateMatrix = async (id: number, matrix: Partial<Matrix>) => {
  return await db.matrices.update(id, matrix);
};

export const getMatricesByParentId = async (id: Matrix["parent"]) => {
  return id === undefined
    ? await db.matrices.filter((matrix) => matrix.parent === undefined).toArray()
    : await db.matrices.where({ parent: id }).toArray();
};
