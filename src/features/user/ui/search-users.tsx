import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useUserStore } from "~/entities/user/model/store";

const SearchUsers = () => {
  const { filter, setFilter } = useUserStore((state) => state);
  console.log(filter);
  return (
    <Input
      value={filter?.query}
      placeholder={"Вячеслав"}
      startContent={<SearchIcon />}
      onChange={(e) =>
        setFilter({
          query: e.target.value,
        })
      }
    />
  );
};

export default SearchUsers;
