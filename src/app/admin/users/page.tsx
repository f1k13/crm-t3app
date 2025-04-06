"use client";

import UserTemplate from "~/app/templates/user/user-template";
import UserModelCreate from "./_components/user-modal-create";
import UsersTable from "./_components/users-table";
import { useDisclosure } from "@heroui/react";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <UserModelCreate isOpen={isOpen} onClose={onClose} />
      <UserTemplate
        table={<UsersTable />}
        button={<ButtonModalOpen onClick={onOpen} />}
      />
    </>
  );
};

export default Page;
