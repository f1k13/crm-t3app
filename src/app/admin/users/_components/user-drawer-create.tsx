import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import React from "react";
import UserCreateForm from "~/widgets/users/ui/user-create-form";

const UserDrawerCreate = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer size={"xl"} isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <span className={"light:text-default-600"}>
            Создание пользователя
          </span>
        </DrawerHeader>
        <DrawerBody>
          <UserCreateForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawerCreate;
