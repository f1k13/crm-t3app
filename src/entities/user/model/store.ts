import type { IUser } from "./user.model";
import { create } from "zustand";

type TSort = {
  field: string;
  order: "asc" | "desc";
};

type TFilter = {
  query: string;
};

type TState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  users: IUser[] | null;
  setUsers: (users: IUser[] | null) => void;
  filter: TFilter;
  sort: TSort;
  setFilter: (filter: TFilter) => void;
  setSort: (sort: TSort) => void;
  page: number | null;
  setPage: (page: number | null) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  selectedDeletedUsers: IUser["id"][];
  setSelectedDeletedUsers: (users: IUser["id"]) => void;
};

export const useUserStore = create<TState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  users: null,
  setUsers: (users) => set({ users }),
  filter: {
    query: "",
  },
  sort: {
    field: "createdAt",
    order: "asc",
  },
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  page: 1,
  setPage: (page) => set({ page }),
  totalCount: 0,
  setTotalCount: (totalCount) => set({ totalCount }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  totalPages: 0,
  setTotalPages: (totalPages) => set({ totalPages }),
  selectedDeletedUsers: [],
  setSelectedDeletedUsers: (user) => {
    const current = get().selectedDeletedUsers ?? [];
    const exists = current.find((u) => u === user);

    const updated = exists
      ? current.filter((u) => u !== user)
      : [...current, user];

    set({ selectedDeletedUsers: updated ?? [] });
  },
}));
