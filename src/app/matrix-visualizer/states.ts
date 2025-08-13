import { create } from "zustand";

interface AppStates {
  triadInfoPanel: {
    visibility: boolean;
    x: number;
    y: number;
  };
  showTriadPanel: (position: [number, number]) => void;
  hideTriadPanel: () => void;
}

export const useAppStore = create<AppStates>((set) => ({
  triadInfoPanel: {
    visibility: false,
    x: 0,
    y: 0,
  },
  showTriadPanel: (position: [number, number]) =>
    set({
      triadInfoPanel: {
        visibility: true,
        x: position[0],
        y: position[1],
      },
    }),
  hideTriadPanel: () => {
    set((state) => ({
      triadInfoPanel: {
        ...state.triadInfoPanel,
        visibility: false,
      },
    }));
  },
}));
