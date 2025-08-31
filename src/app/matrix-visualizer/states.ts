import { type Size } from "@react-three/fiber";
import { type Camera, type Scene } from "three";
import { create } from "zustand";

interface TriadInfoPanelState {
  triadId: number;
  showChildren: boolean;
  showTriadPanel: (triadId: number, showChildren?: boolean) => void;
}

export const useTriadInfoPanelState = create<TriadInfoPanelState>((set) => ({
  triadId: 0,
  showChildren: false,
  showTriadPanel: (triadId: number, showChildren = false) => set({ triadId, showChildren }),
}));

interface States3d {
  size: Size | null;
  scene: Scene | null;
  camera: Camera | null;
  setCamera: (camera: Camera) => void;
  setScene: (scene: Scene) => void;
  setSize: (size: Size) => void;
}

export const useStates3d = create<States3d>((set) => ({
  size: null,
  scene: null,
  camera: null,
  setCamera: (camera) =>
    set({
      camera,
    }),
  setScene: (scene) =>
    set({
      scene,
    }),
  setSize: (size) =>
    set({
      size,
    }),
}));
