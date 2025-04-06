import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { userAdapter } from "~/entities/user/adapter/user-adapter";
import { useGetAll } from "~/entities/user/hooks/use-get-all";
import { userFields } from "~/entities/user/model/user.model";

const UsersTable = () => {
  const { data, isLoading } = useGetAll({ page: 1, limit: 10 });
  const users = userAdapter(data ?? []);
  return (
    <Table>
      <TableHeader columns={userFields}>
        {(it) => <TableColumn key={it.key}>{it.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users}>
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
