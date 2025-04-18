import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSuggestCompany } from "~/entities/company/hooks/use-suggest-company";
import { useCompanyStore } from "~/entities/company/model/store";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";
import { FlexItemsCenter } from "~/shared/ui/templates/common";
type TArgsFunc = {
  value: string;
  inn: string;
};
const FieldCompanyName = () => {
  const { setValue } = useFormContext();

  const type = useWatch({ name: "type" }) as CompanyTypeEnum;
  const isDisabled = type === CompanyTypeEnum.NP;

  const { querySuggest, setQuerySuggest } = useCompanyStore((state) => state);
  const [querySearch, setQuerySearch] = useState("");
  const setNameInnCompany = (data: TArgsFunc) => {
    setValue("name", data.value);
    setValue("inn", data.inn);
  };
  const onChangeDebounce = useCallback(
    debounce((value: string) => {
      setQuerySuggest(value);
    }, 800),
    [setQuerySuggest],
  );

  const handleChange = (value: string) => {
    setQuerySearch(value);
    onChangeDebounce(value);
  };

  const { data, isLoading } = useSuggestCompany({ query: querySuggest });

  return (
    <Autocomplete
      isDisabled={isDisabled}
      startContent={<Search />}
      items={data?.suggestions ?? []}
      inputValue={querySearch}
      onInputChange={handleChange}
      isRequired={!isDisabled}
      isLoading={isLoading}
      placeholder={"ИНН или наименование организации"}
      label={"Введите ИНН"}
      shouldCloseOnBlur={false}
      scrollShadowProps={{
        isEnabled: true,
      }}
      listboxProps={{
        emptyContent: "Компаний не найдено.",
      }}
    >
      {(company) => (
        <AutocompleteItem
          textValue={company.value}
          onPress={() =>
            setNameInnCompany({
              value: company.value,
              inn: String(company.data.inn),
            })
          }
          key={`${company.value}-${company.data.inn}-${Date.now()}-${company.data.ogrn}`}
        >
          <FlexItemsCenter>
            {company.value} - {company.data.inn}
          </FlexItemsCenter>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default FieldCompanyName;
