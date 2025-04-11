import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { useCallback, type Key, type ReactNode } from "react";
import {
  ROLES,
  userFields,
  type IUser,
} from "~/entities/user/model/user.model";

import { DateTime } from "luxon";
import { RelativeFlexItemsCenter } from "~/app/_templates/common";
import { Pencil, Trash2 } from "lucide-react";
import { useUserStore } from "~/entities/user/model/store";

type TUserWithKey = IUser & { key: string };
const UsersTable = ({
  users,
  topContent,
  bottomContent,
  onOpenEdit,
}: {
  users: TUserWithKey[];
  topContent: ReactNode;
  bottomContent: ReactNode;
  onOpenEdit: () => void;
}) => {
  const { setUser } = useUserStore((state) => state);

  const renderCell = useCallback(
    (user: IUser, columnKey: Key) => {
      switch (columnKey) {
        case "login": {
          return <span>{user.login}</span>;
        }
        case "firstName": {
          return <span>{user.firstName}</span>;
        }
        case "role": {
          return <span>{ROLES[user.role]}</span>;
        }
        case "email": {
          return <span>{user.email}</span>;
        }
        case "middleName": {
          return <span>{user.middleName}</span>;
        }
        case "lastName": {
          return <span>{user.lastName}</span>;
        }
        case "createdAt": {
          return (
            <span>
              {DateTime.fromISO(user.createdAt.toISOString())
                .setLocale("ru")
                .toFormat("d MMMM yyyy")}
            </span>
          );
        }
        case "actions": {
          return (
            <RelativeFlexItemsCenter>
              <Tooltip content={"Редактировать"}>
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <Pencil
                    onClick={() => {
                      setUser(user);
                      onOpenEdit();
                    }}
                  />
                </span>
              </Tooltip>
              <Tooltip color={"danger"} content={"Удалить"}>
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <Trash2 />
                </span>
              </Tooltip>
            </RelativeFlexItemsCenter>
          );
        }
      }
    },
    [onOpenEdit, setUser],
  );

  return (
    <Table
      topContent={topContent}
      bottomContent={bottomContent}
      className={"dark:light:bg-default-400"}
    >
      <TableHeader columns={userFields}>
        {(it) => <TableColumn key={it.key}>{it.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Пользователей еще нет в системе"} items={users}>
        {(it) => (
          <TableRow key={it.key}>
            {(user) => <TableCell>{renderCell(it, user)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
