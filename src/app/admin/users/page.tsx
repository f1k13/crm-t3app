"use client";

import UserTemplate from "~/app/_templates/user/user-template";
import UsersTable from "./_components/users-table";
import { useDisclosure } from "@heroui/react";
import UserDrawerCreate from "./_components/user-drawer-create";
import UserTableTopContent from "~/widgets/users/ui/user-table-top-content";
import UserDrawerEdit from "./_components/user-drawer-edit";

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

  return (
    <>
      <UserDrawerCreate isOpen={isOpenCreate} onClose={onCloseCreate} />
      <UserDrawerEdit isOpen={isOpenEdit} onClose={onCloseEdit} />
      <UserTemplate
        table={
          <UsersTable
            topContent={<UserTableTopContent onOpen={onOpenCreate} />}
            onOpenEdit={onOpenEdit}
            bottomContent={<></>}
          />
        }
        title={"Пользователи"}
      />
    </>
  );
};

export default Page;
