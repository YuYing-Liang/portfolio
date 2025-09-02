import { create } from "zustand";
import { Pages } from "./constants";

interface PageState {
  page: Pages;
  setPage: (page: Pages) => void;
}

export const usePageState = create<PageState>((set) => ({
  page: "Configure",
  setPage: (page) => set({ page }),
}));
