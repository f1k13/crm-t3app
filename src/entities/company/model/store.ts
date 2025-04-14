import { create } from "zustand";

type TState = {
  query: string;
  setQuery: (value: string) => void;
};

export const useCompanyStore = create<TState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
