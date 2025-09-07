import Dexie, { type EntityTable } from "dexie";

// export const db = new Dexie("Database") as Dexie & {
//   matrices: EntityTable<MatrixWithId, "id">;
//   settings: EntityTable<Setting, "id">;
// };

// db.version(1).stores({
//   matrices: "++id, name, parent, pose, colors",
// });

// db.matrices.hook("deleting", async (id) => {
//   await db.matrices.where("parent").equals(id).delete();
// });
