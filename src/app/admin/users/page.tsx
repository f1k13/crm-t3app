"use client";

import UserTemplate from "~/app/templates/user/user-template";
import UsersTable from "./_components/users-table";
import { useDisclosure } from "@heroui/react";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";
import UserDrawerCreate from "./_components/user-drawer-create";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <UserDrawerCreate isOpen={isOpen} onClose={onClose} />
      <UserTemplate
        table={<UsersTable />}
        button={<ButtonModalOpen onClick={onOpen} />}
      />
    </>
  );
};

export default Page;
