import Dexie, { type Table, type EntityTable } from "dexie";
import type { MatrixWithId, Setting } from "./tables";
import { BASE_FRAME_MATRIX } from "../constants";
import { DEFAULT_SETTINGS, MOST_RECENT_VERSION } from "./versions";

const db = new Dexie("Database") as Dexie & {
  matrices: EntityTable<MatrixWithId, "id">;
  settings: EntityTable<Setting, "id">;
};

const enureDefaultMatrix = async (table: Table<MatrixWithId, number, MatrixWithId>, matrixToAdd: MatrixWithId) => {
  const existing = await table.get(matrixToAdd.id);
  if (!existing) {
    await table.add(matrixToAdd);
    console.log(`Created row with id=${matrixToAdd.id}`);
  } else {
    console.log(`Row with id=${matrixToAdd.id} already exists`);
  }
};

db.version(1).stores({
  matrices: "++id, name, parent, pose, colors",
});

db.version(2)
  .stores({
    matrices: "++id, name, parent, pose, colors",
    settings: "++id, name, type, value, min, max",
  })
  .upgrade(async (tx) => {
    await enureDefaultMatrix(tx.table<MatrixWithId, integer, MatrixWithId>("matrices"), BASE_FRAME_MATRIX);
  });

db.version(3)
  .stores({
    matrices: "++id, name, parent, pose, colors",
    settings: "++id, name, type, value, min, max",
  })
  .upgrade(async (tx) => {
    const settings = tx.table<Setting>("settings");
    if (DEFAULT_SETTINGS[MOST_RECENT_VERSION] === undefined) return;
    await settings.bulkPut(DEFAULT_SETTINGS[MOST_RECENT_VERSION]);
  });

db.on("populate", async () => {
  await enureDefaultMatrix(db.table("matrices"), BASE_FRAME_MATRIX);
});

export { db };
