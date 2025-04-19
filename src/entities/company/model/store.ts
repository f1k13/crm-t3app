import { create } from "zustand";
import type { TCompanyData } from "./company.model";

type TState = {
  querySuggest: string;
  setQuerySuggest: (value: string) => void;
  list: TCompanyData[];
  setList: (data: TCompanyData[]) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const useCompanyStore = create<TState>((set) => ({
  querySuggest: "",
  setQuerySuggest: (querySuggest) => set({ querySuggest }),
  list: [],
  setList: (list) => set({ list }),
  query: "",
  setQuery: (query) => set({ query }),
}));
