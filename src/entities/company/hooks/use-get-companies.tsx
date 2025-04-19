import { api } from "~/trpc/react";

type TArgsUseGetCompanies = {
  page: number;
  limit: number;
  query: string;
};

export function useGetCompanies(args: TArgsUseGetCompanies) {
  const { data, isLoading } = api.company.getAllCompanies.useQuery(args);

  return {
    data,
    isLoading,
  };
}
