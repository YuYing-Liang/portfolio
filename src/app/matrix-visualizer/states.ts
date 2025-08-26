import { type Size } from "@react-three/fiber";
import { type Camera, type Scene } from "three";
import { create } from "zustand";

interface TriadInfoPanelState {
  visibility: boolean;
  x: number;
  y: number;
  triadId: number;
  showTriadPanel: (position: [number, number], triadId: number) => void;
  hideTriadPanel: () => void;
}

export const useTriadInfoPanelState = create<TriadInfoPanelState>((set) => ({
  visibility: false,
  x: 0,
  y: 0,
  triadId: 0,
  showTriadPanel: (position: [number, number], triadId: number) =>
    set({
      visibility: true,
      x: position[0],
      y: position[1],
      triadId,
    }),
  hideTriadPanel: () => {
    set({
      visibility: false,
    });
  },
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
