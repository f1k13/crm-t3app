import { api } from "~/trpc/react";

export const useGetAll = ({
  page,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  const { data, isLoading } = api.admin.getAllUser.useQuery({ page, limit });

  return {
    data,
    isLoading,
  };
};
