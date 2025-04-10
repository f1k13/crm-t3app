import { getKeyValue, TableCell } from "@heroui/react";
import type { IUser } from "~/entities/user/model/user.model";

type TUserWithKey = IUser & { key: string };

const UserTableRow = ({
  user,
  key,
}: {
  user: TUserWithKey;
  key: string | number;
}) => {
  return <TableCell>{getKeyValue(user, key)}</TableCell>;
};

export default UserTableRow;
