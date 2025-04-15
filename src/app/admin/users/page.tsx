"use client";

import UsersTable from "./_components/users-table";
import { useDisclosure } from "@heroui/react";
import UserDrawerCreate from "./_components/user-drawer-create";
import UserTableTopContent from "~/widgets/users/ui/user-table-top-content";
import UserDrawerEdit from "./_components/user-drawer-edit";
import UserTableBottomContent from "~/widgets/users/ui/user-table-bottom-content";
import UserConfirmDeletedModal from "./_components/user-confirm-deleted-modal";
import { PageTemplate } from "~/shared/ui/templates/common";

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
  const {
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
    isOpen: isOpenDelete,
  } = useDisclosure();
  return (
    <>
      <UserDrawerCreate isOpen={isOpenCreate} onClose={onCloseCreate} />
      <UserDrawerEdit isOpen={isOpenEdit} onClose={onCloseEdit} />
      <UserConfirmDeletedModal isOpen={isOpenDelete} onClose={onCloseDelete} />
      <PageTemplate
        content={
          <UsersTable
            topContent={
              <UserTableTopContent
                onOpenDelete={onOpenDelete}
                onOpen={onOpenCreate}
              />
            }
            onOpenEdit={onOpenEdit}
            bottomContent={<UserTableBottomContent />}
          />
        }
        title={"Пользователи"}
      />
    </>
  );
};

export default Page;
