import { api } from "~/trpc/react";

export function useSuggestCompany({ query }: { query: string }) {
  const { data, isLoading } = api.company.suggestCompany.useQuery(
    {
      query: String(query) ?? "",
    },
    {
      enabled: !!query,
    },
  );
  return {
    data,
    isLoading,
  };
}
