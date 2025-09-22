import Dexie, { type EntityTable } from "dexie";
import { type Chassis, type Wheel, type Trajectory } from "./tables";

export class KinematicDB extends Dexie {
  chassis!: EntityTable<Chassis, "id">;
  wheels!: EntityTable<Wheel, "id">;
  trajectories!: EntityTable<Trajectory, "id">;

  constructor() {
    super("KinematicDB");
    this.version(1).stores({
      chassis: "++id, name, type",
      wheels: "++id, name, chassis",
      trajectories: "++id, name",
    });
  }
}

export const db = new KinematicDB();
