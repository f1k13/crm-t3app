import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import UserEditForm from "./forms/user-edit-form";

const UserDrawerEdit = ({
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
            Редактирование пользователя
          </span>
        </DrawerHeader>
        <DrawerBody>
          <UserEditForm onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawerEdit;
