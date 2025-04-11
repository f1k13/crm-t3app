"use client";

import { useEffect } from "react";
import { useUserStore } from "../model/store";
import { useGetAll } from "./use-get-all";

export const useFilterUsers = () => {
  const { setUsers, users, setTotalCount } = useUserStore((state) => state);

  const { data, isLoading } = useGetAll({ page: 1, limit: 10 });

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      setTotalCount(data.totalCount);
    }
  }, [data, setTotalCount, setUsers]);
  return {
    data: users,
    isLoading,
  };
};
