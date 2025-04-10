"use client";

import UserTemplate from "~/app/_templates/user/user-template";
import UsersTable from "./_components/users-table";
import { Spinner, useDisclosure } from "@heroui/react";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";
import UserDrawerCreate from "./_components/user-drawer-create";
import { useGetAll } from "~/entities/user/hooks/use-get-all";
import { userAdapter } from "~/entities/user/adapter/user-adapter";
import If from "~/features/abstract/if";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useGetAll({ page: 1, limit: 10 });
  const users = userAdapter(data ?? []);

  return (
    <If condition={!isLoading} fallback={<Spinner />}>
      <UserDrawerCreate isOpen={isOpen} onClose={onClose} />
      <UserTemplate
        table={<UsersTable users={users} />}
        button={<ButtonModalOpen onClick={onOpen} />}
      />
    </If>
  );
};

export default Page;
