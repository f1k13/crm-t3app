import { Input } from "@heroui/react";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useCompanyStore } from "~/entities/company/model/store";

const QueryCompany = () => {
  const { setQuery } = useCompanyStore((state) => state);
  const [value, setValue] = useState("");
  const onChangeDebounce = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 500),
    [setQuery],
  );
  const handleInputChange = (value: string) => {
    setValue(value);
    onChangeDebounce(value);
  };
  return (
    <Input
      value={value}
      placeholder={"Наименование или ИНН"}
      startContent={<SearchIcon />}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default QueryCompany;
