import { create } from "zustand";
import { type Pages } from "./constants";

interface PageState {
  page: Pages;
  setPage: (page: Pages) => void;
}

export const usePageState = create<PageState>((set) => ({
  page: "configure",
  setPage: (page) => set({ page }),
}));
