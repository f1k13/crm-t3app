import { useEffect } from "react";
import { useCompanyStore } from "../model/store";
import { useGetCompanies } from "./use-get-companies";

export function useFilterCompanies() {
  const { setList, list, query } = useCompanyStore((state) => state);

  const { data, isLoading } = useGetCompanies({
    page: 1,
    limit: 10,
    query,
  });

  useEffect(() => {
    if (data) {
      setList(data.data);
    }
  }, [data, setList]);
  return {
    data: list,
    isLoading,
  };
}
