import { create } from "zustand";
import { type Wheel } from "../(database)/tables";

interface WheelFormValues extends Pick<Wheel, "name" | "length" | "width"> {
  x: number;
  y: number;
  rotation: number;
  setName: (name: string) => void;
  setLength: (length: number) => void;
  setWidth: (width: number) => void;
  setRotation: (rotation: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useWheelForm = create<WheelFormValues>((set) => ({
  name: "New Wheel",
  length: 2,
  width: 1,
  x: 0,
  y: 0,
  rotation: 0,
  setName: (name) => set(() => ({ name })),
  setLength: (length) => set(() => ({ length })),
  setWidth: (width) => set(() => ({ width })),
  setRotation: (rotation) => set(() => ({ rotation })),
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set(() => ({ [name]: value }));
  },
}));
