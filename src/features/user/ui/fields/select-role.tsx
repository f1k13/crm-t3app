import { Select, SelectItem } from "@heroui/react";
import { roleData } from "~/entities/user/model/user.model";
import { RoleEnum } from "~/server/api/enums/role-enum";

const SelectRole = ({
  onClick,
  value,
}: {
  onClick: (key: RoleEnum) => void;
  value: RoleEnum;
}) => {
  return (
    <Select label={"Выберите роль"} defaultSelectedKeys={[value]} isRequired>
      {roleData.map((it) => (
        <SelectItem onPress={() => onClick(it.key)} key={it.key}>
          {it.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectRole;
