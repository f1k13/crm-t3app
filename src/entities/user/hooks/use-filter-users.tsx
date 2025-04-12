"use client";

import { useEffect } from "react";
import { useUserStore } from "../model/store";
import { useGetAll } from "./use-get-all";

export const useFilterUsers = () => {
  const { setUsers, users, setTotalCount, sort, filter, setTotalPages, page } =
    useUserStore((state) => state);

  const { data, isLoading } = useGetAll({
    page: page ?? 1,
    limit: 10,
    sort,
    filter,
  });

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    }
  }, [data, setTotalCount, setUsers]);
  return {
    data: users,
    isLoading,
  };
};
