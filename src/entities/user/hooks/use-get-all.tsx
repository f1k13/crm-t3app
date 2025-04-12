import { api } from "~/trpc/react";
import { type useUserStore } from "../model/store";

type TSort = ReturnType<typeof useUserStore.getState>["sort"];
type TFilter = ReturnType<typeof useUserStore.getState>["filter"];
export const useGetAll = ({
  page,
  limit = 10,
  sort,
  filter,
}: {
  page: number;
  limit: number;
  sort: TSort;
  filter?: TFilter;
}) => {
  const { data, isLoading } = api.admin.getAllUser.useQuery({
    page,
    limit,
    sort,
    filter: filter!,
  });
  return {
    data,
    isLoading,
  };
};
