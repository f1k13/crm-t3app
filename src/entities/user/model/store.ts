import type { IUser } from "./user.model";
import { create } from "zustand";

type TSort = {
  date: string;
  firstName: string;
};

type TFilter = {
  query: string;
};

type TState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  users: IUser[] | null;
  setUsers: (users: IUser[] | null) => void;
  filter: TFilter | null;
  sort: {
    date: string;
    firstName: string;
  } | null;
  setFilter: (filter: TFilter | null) => void;
  setSort: (sort: TSort | null) => void;
  page: number | null;
  setPage: (page: number | null) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
};

export const useUserStore = create<TState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  users: null,
  setUsers: (users) => set({ users }),
  filter: {
    query: "",
  },
  sort: {
    date: "",
    firstName: "",
  },
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  page: 0,
  setPage: (page) => set({ page }),
  totalCount: 0,
  setTotalCount: (totalCount) => set({ totalCount }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
