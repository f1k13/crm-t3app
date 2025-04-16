import { Select, SelectItem } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { useGetAreas } from "~/entities/area/hooks/use-get-area";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";

const FieldArea = () => {
  const { setValue } = useFormContext<TCompanyFormValues>();
  const { data, isLoading } = useGetAreas();
  return (
    <Select
      isRequired
      label={"Сфера деятельности"}
      placeholder={"Строительство дорог"}
      inputMode={"text"}
      isLoading={isLoading}
    >
      {Array.isArray(data) && data.length > 0
        ? data?.map((it) => (
            <SelectItem onPress={() => setValue("areaId", it.id)} key={it.id}>
              {it.name}
            </SelectItem>
          ))
        : []}
    </Select>
  );
};

export default FieldArea;
