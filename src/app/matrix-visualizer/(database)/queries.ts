import { type Table } from "dexie";
import { isParentBase } from "../helpers";
import { type TriadTreeElement } from "../types";
import { db } from "./db";
import type { Matrix, MatrixWithId, Setting } from "./tables";
import { DEFAULT_SETTINGS } from "./versions";

export const ensureDefaultMatrix = async (
  table: Table<MatrixWithId, number, MatrixWithId>,
  matrixToAdd: MatrixWithId,
) => {
  const existing = await table.get(matrixToAdd.id);
  if (!existing) {
    await table.add(matrixToAdd);
    console.log(`Created row with id=${matrixToAdd.id}`);
  } else {
    console.log(`Row with id=${matrixToAdd.id} already exists`);
  }
};

export const ensureDefaultSettings = async (table: Table<Setting, number, Setting>, version: number) => {
  await table.clear();
  if (DEFAULT_SETTINGS[version] === undefined) {
    console.log("No default settings found.");
    return;
  }
  const response = await table.bulkPut(DEFAULT_SETTINGS[version]);
  console.log(`Finished initializing settings database: ${response}`);
};

export const addMatrix = async (matrix: Matrix) => {
  return await db.matrices.add(matrix);
};

export const getMatrix = async (id: number) => {
  return await db.matrices.get(id);
};

export const updateMatrix = async (id: number, matrix: Partial<Matrix>) => {
  return await db.matrices.update(id, matrix);
};

export const deleteMatrix = async (id: number) => {
  return await db.matrices.delete(id);
};

export const getMatricesByParentId = async (id: Matrix["parent"]) => {
  return id === undefined
    ? await db.matrices.filter((matrix) => matrix.parent === undefined).toArray()
    : await db.matrices.where({ parent: id }).toArray();
};

export const getAllMatrixNamesAndIds = async (indicesToExclude?: number[]) => {
  return await db.matrices.toArray().then((matrices) => {
    const matrixData = [];

    for (const matrix of matrices) {
      if (indicesToExclude === undefined || (indicesToExclude !== undefined && !indicesToExclude.includes(matrix.id))) {
        matrixData.push({ id: matrix.id, name: matrix.name });
      }
    }
    return matrixData;
  });
};

export const getMatrixTreeStructure = async () => {
  return await db.matrices.toArray().then((matrices) => {
    const matrixMap = new Map<number, TriadTreeElement>();

    for (const matrix of matrices) {
      if (matrix.id === 0) continue;
      matrixMap.set(matrix.id, {
        value: matrix.id.toString(),
        label: matrix.name,
        parent: matrix.parent,
        children: [],
      });
    }

    for (const matrix of matrixMap.values()) {
      if (matrix.parent !== undefined && !isParentBase(matrix.parent)) {
        matrixMap.get(matrix.parent)!.children.push(matrix);
      }
    }

    for (const [matrixId, matrix] of matrixMap.entries()) {
      if (!isParentBase(matrix.parent)) {
        matrixMap.delete(matrixId);
      }
    }

    return [...matrixMap.values()];
  });
};

export const getAllSettings = async () => {
  return await db.settings.toArray();
};

export const updateSetting = async (id: number, value: Setting["value"]) => {
  return await db.settings.update(id, { value });
};

export const getSetting = async (id: number) => {
  return await db.settings.get(id);
};
