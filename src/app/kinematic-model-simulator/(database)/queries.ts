import { type Chassis, type Wheel, type Trajectory } from "./tables";
import { db } from "./db";

export const addChassis = (chassis: Omit<Chassis, "id">) => db.chassis.add(chassis);
export const getChassis = (id: number) => db.chassis.get(id);
export const updateChassis = (id: number, changes: Partial<Chassis>) => db.chassis.update(id, changes);
export const deleteChassis = (id: number) => db.chassis.delete(id);
export const batchGetChassis = (ids: number[]) => db.chassis.bulkGet(ids);
export const getAllChassis = () => db.chassis.toArray();
export const getAllChassisNames = (excludIds?: number[]) =>
  excludIds === undefined
    ? db.chassis.orderBy("name").uniqueKeys()
    : db.chassis
        .where("id")
        .noneOf(excludIds)
        .toArray()
        .then((chassisList) => chassisList.map((c) => c.name));

export const addWheel = (wheel: Omit<Wheel, "id">) => db.wheels.add(wheel);
export const getWheel = (id: number) => db.wheels.get(id);
export const updateWheel = (id: number, changes: Partial<Wheel>) => db.wheels.update(id, changes);
export const deleteWheel = (id: number) => db.wheels.delete(id);
export const batchGetWheels = (ids: number[]) => db.wheels.bulkGet(ids);
export const getWheelsByChassisId = (chassisId: number) => db.wheels.where("chassis").equals(chassisId).toArray();
export const getWheelNamesByChassisId = (chassisId: number, excludeIds?: number[]) =>
  db.wheels
    .where("chassis")
    .equals(chassisId)
    .toArray()
    .then((wheelList) =>
      wheelList
        .filter((wheel) => (excludeIds !== undefined ? !excludeIds.includes(wheel.id) : true))
        .map((wheel) => wheel.name),
    );

export const addTrajectory = (trajectory: Omit<Trajectory, "id">) => db.trajectories.add(trajectory as Trajectory);
export const getTrajectory = (id: number) => db.trajectories.get(id);
export const updateTrajectory = (id: number, changes: Partial<Trajectory>) => db.trajectories.update(id, changes);
export const deleteTrajectory = (id: number) => db.trajectories.delete(id);
export const batchGetTrajectories = (ids: number[]) => db.trajectories.bulkGet(ids);
export const getAllTrajectories = () => db.trajectories.toArray();
