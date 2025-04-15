import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { companyDataType } from "~/entities/company/model/company.model";

const FieldSelectTypeCompany = () => {
  const { setValue, watch } = useFormContext();
  const value = watch("type") as string;
  return (
    <Select
      label={"Выберите тип компании"}
      defaultSelectedKeys={[value]}
      isRequired
    >
      {companyDataType.map((it) => (
        <SelectItem key={it.key} onPress={() => setValue("type", it.key)}>
          {it.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FieldSelectTypeCompany;
