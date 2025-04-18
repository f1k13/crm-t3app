"use client";

import { useFilterCompanies } from "~/entities/company/hooks/use-filter-companies";

const List = () => {
  const { data } = useFilterCompanies();
  console.log(data);
  return <div>List</div>;
};

export default List;
