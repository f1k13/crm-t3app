import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { userFields, type IUser } from "~/entities/user/model/user.model";
type TUserWithKey = IUser & { key: string };
const UsersTable = ({ users }: { users: TUserWithKey[] }) => {
  return (
    <Table className={"dark:light:bg-default-400"}>
      <TableHeader columns={userFields}>
        {(it) => <TableColumn key={it.key}>{it.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Пользователей еще нет в системе"} items={users}>
        {(it) => (
          <TableRow key={it.key}>
            {(user) => <TableCell>{getKeyValue(it, user)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
