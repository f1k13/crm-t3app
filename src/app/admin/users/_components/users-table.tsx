import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  type SortDescriptor,
} from "@heroui/react";
import { useCallback, useState, type Key, type ReactNode } from "react";
import {
  ROLES,
  userFields,
  type IUser,
} from "~/entities/user/model/user.model";

import { DateTime } from "luxon";
import { RelativeFlexItemsCenter } from "~/app/_templates/common";
import { Pencil, Trash2 } from "lucide-react";
import { useUserStore } from "~/entities/user/model/store";
import { useFilterUsers } from "~/entities/user/hooks/use-filter-users";
import { userAdapter } from "~/entities/user/adapter/user-adapter";

const UsersTable = ({
  topContent,
  bottomContent,
  onOpenEdit,
}: {
  topContent: ReactNode;
  bottomContent: ReactNode;
  onOpenEdit: () => void;
}) => {
  const { setUser } = useUserStore((state) => state);
  const { data, isLoading } = useFilterUsers();
  const { setSort } = useUserStore((state) => state);
  const users = userAdapter(data ?? []);
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
  const [sortDes, setSortDes] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const onChangeSort = useCallback(
    (description: SortDescriptor) => {
      setSortDes(description);
      setSort({
        field: description.column as string,
        order: description.direction === "ascending" ? "asc" : "desc",
      });
    },
    [setSort],
  );

  return (
    <Table
      onSortChange={onChangeSort}
      topContent={topContent}
      bottomContent={bottomContent}
      sortDescriptor={sortDes}
      className={"dark:light:bg-default-400"}
    >
      <TableHeader columns={userFields}>
        {(it) => (
          <TableColumn allowsSorting={it.sortable} key={it.key}>
            {it.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={"Пользователей еще нет в системе"}
        items={users}
        loadingContent={<Spinner />}
      >
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
