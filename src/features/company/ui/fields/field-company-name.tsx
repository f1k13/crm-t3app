import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useSuggestCompany } from "~/entities/company/hooks/use-suggest-company";
import { useCompanyStore } from "~/entities/company/model/store";

const FieldCompanyName = ({
  setValue,
}: {
  setValue: (value: string) => void;
}) => {
  const { query, setQuery } = useCompanyStore((state) => state);
  const [querySearch, setQuerySearch] = useState("");

  const onChangeDebounce = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 800),
    [setQuery],
  );

  const handleChange = (value: string) => {
    setQuerySearch(value);
    onChangeDebounce(value);
  };

  const { data, isLoading } = useSuggestCompany({ query });
  return (
    <Autocomplete
      items={data?.suggestions ?? []}
      inputValue={querySearch}
      onInputChange={handleChange}
      isRequired
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
          onPress={() => setValue(company.value)}
          key={`${company.value}-${company.data.inn}`}
        >
          <div className={"flex items-center"}>
            {company.value} - {company.data.inn}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default FieldCompanyName;
