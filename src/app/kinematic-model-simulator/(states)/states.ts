import { create } from "zustand";
import { type Pages } from "../constants";

interface PageState {
  page: Pages;
  setPage: (page: Pages) => void;
}

export const usePageState = create<PageState>((set) => ({
  page: "configure",
  setPage: (page) => set({ page }),
}));

interface CanvasState {
  showOverlayGrid: boolean;
  setOverlayGrid: (state: boolean) => void;
}

export const useCanvasState = create<CanvasState>((set) => ({
  showOverlayGrid: false,
  setOverlayGrid: (state) => set({ showOverlayGrid: state }),
}));