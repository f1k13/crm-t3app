"use client";

import UserTemplate from "~/app/_templates/user/user-template";
import UsersTable from "./_components/users-table";
import { Spinner, useDisclosure } from "@heroui/react";
import UserDrawerCreate from "./_components/user-drawer-create";
import { userAdapter } from "~/entities/user/adapter/user-adapter";
import If from "~/features/abstract/if";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";
import { useFilterUsers } from "~/entities/user/hooks/use-filter-users";
import UserTableTopContent from "~/widgets/users/ui/user-table-top-content";

const Page = () => {
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const { data, isLoading } = useFilterUsers();

  const users = userAdapter(data ?? []);
  return (
    <If condition={!isLoading} fallback={<Spinner />}>
      <UserDrawerCreate isOpen={isOpenCreate} onClose={onCloseCreate} />
      <UserTemplate
        table={
          <UsersTable
            topContent={<UserTableTopContent onOpen={onOpenCreate} />}
            bottomContent={<></>}
            users={users}
          />
        }
        title={"Пользователи"}
      />
    </If>
  );
};

export default Page;
