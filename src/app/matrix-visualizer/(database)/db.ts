import Dexie, { type EntityTable } from "dexie";
import type { MatrixWithId, Setting } from "./tables";
import { BASE_FRAME_MATRIX } from "../constants";
import { MOST_RECENT_SETTINGS_VERSION } from "./versions";
import { ensureDefaultMatrix, ensureDefaultSettings } from "./queries";

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
    settings: "++id, name, type, value, options, min, max, step, markers",
  })
  .upgrade(async (tx) => {
    console.log("Updating to v2");
    await ensureDefaultMatrix(tx.table<MatrixWithId, number, MatrixWithId>("matrices"), BASE_FRAME_MATRIX);
  });

db.version(3)
  .stores({
    matrices: "++id, name, parent, pose, colors",
    settings: "++id, name, type, value, options, min, max, step, markers",
  })
  .upgrade(async (tx) => {
    console.log("Updating to v3");
    await ensureDefaultSettings(tx.table<Setting, number, Setting>("settings"), MOST_RECENT_SETTINGS_VERSION);
  });

db.matrices.hook("deleting", async (id) => {
  await db.matrices.where("parent").equals(id).delete();
});
