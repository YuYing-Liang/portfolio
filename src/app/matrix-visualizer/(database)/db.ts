import Dexie, { type EntityTable } from "dexie";
import type { MatrixWithId } from "./tables";
import { BASE_FRAME_MATRIX, DEFAULT_AXIS_COLORS } from "../constants";

const db = new Dexie("Database") as Dexie & {
  matrices: EntityTable<MatrixWithId, "id">;
};

const ensureRow = async (matrixToAdd: MatrixWithId) => {
  const existing = await db.matrices.get(matrixToAdd.id);
  if (!existing) {
    await db.matrices.add(matrixToAdd);
    console.log(`Created row with id=${matrixToAdd.id}`);
  } else {
    console.log(`Row with id=${matrixToAdd.id} already exists`);
  }
};

db.version(1).stores({
  matrices: "++id, name, parent, pose, colors",
});

db.on("populate", async () => {
  await ensureRow(BASE_FRAME_MATRIX);
});

export { db };
