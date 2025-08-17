import { create } from "zustand";

interface TriadInfoPanelState {
  visibility: boolean;
  x: number;
  y: number;
  showTriadPanel: (position: [number, number]) => void;
  hideTriadPanel: () => void;
}

export const useTriadInfoPanelState = create<TriadInfoPanelState>((set) => ({
  visibility: false,
  x: 0,
  y: 0,
  showTriadPanel: (position: [number, number]) =>
    set({
      visibility: true,
      x: position[0],
      y: position[1],
    }),
  hideTriadPanel: () => {
    set((state) => ({
      ...state,
      visibility: false,
    }));
  },
}));
