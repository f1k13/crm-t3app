import { Input } from "@heroui/react";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useUserStore } from "~/entities/user/model/store";

const SearchUsers = () => {
  const { setFilter } = useUserStore((state) => state);
  const [query, setQuery] = useState("");
  const onChangeDebounce = useCallback(
    debounce((value: string) => {
      setFilter({
        query: value,
      });
    }, 500),
    [setFilter],
  );
  const handleInputChange = (value: string) => {
    setQuery(value);
    onChangeDebounce(value);
  };

  return (
    <Input
      value={query}
      placeholder={"Вячеслав"}
      startContent={<SearchIcon />}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default SearchUsers;
