import Dexie, { type Table, type EntityTable } from "dexie";
import type { MatrixWithId, Setting } from "./tables";
import { BASE_FRAME_MATRIX } from "../constants";
import { DEFAULT_SETTINGS, MOST_RECENT_VERSION } from "./versions";
import { ensureDefaultMatrix } from "./queries";

export const db = new Dexie("Database") as Dexie & {
  matrices: EntityTable<MatrixWithId, "id">;
  settings: EntityTable<Setting, "id">;
};

db.version(1).stores({
  matrices: "++id, name, parent, pose, colors",
});

db.version(2)
  .stores({
    matrices: "++id, name, parent, pose, colors",
  })
  .upgrade(async (tx) => {
    await ensureDefaultMatrix(tx.table<MatrixWithId, integer, MatrixWithId>("matrices"), BASE_FRAME_MATRIX);
  });

db.version(3)
  .stores({
    matrices: "++id, name, parent, pose, colors",
    settings: "++id, name, type, value, options, min, max, step, markers",
  })
  .upgrade(async (tx) => {
    const settings = tx.table<Setting>("settings");
    await settings.clear();
    if (DEFAULT_SETTINGS[MOST_RECENT_VERSION] === undefined) return;
    await settings.bulkPut(DEFAULT_SETTINGS[MOST_RECENT_VERSION]);
  });

db.matrices.hook("deleting", async (id) => {
  await db.matrices.where("parent").equals(id).delete();
});
