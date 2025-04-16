import { api } from "~/trpc/react";

export const useGetAreas = () => {
  const { data, isLoading } = api.area.getAreas.useQuery();

  return {
    data,
    isLoading,
  };
};
