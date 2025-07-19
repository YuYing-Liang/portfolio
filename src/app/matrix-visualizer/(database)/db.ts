import Dexie, { type EntityTable } from "dexie";
import type { MatrixWithId } from "./tables";

const db = new Dexie("Database") as Dexie & {
  matrices: EntityTable<MatrixWithId, "id">;
};

db.version(1).stores({
  matrices: "++id, name, parent, pose, colors",
});

export { db };
