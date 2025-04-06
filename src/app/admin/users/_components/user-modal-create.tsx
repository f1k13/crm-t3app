import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import React from "react";
import UserCreateForm from "~/widgets/users/ui/user-create-form";

const UserModelCreate = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <span className={"light:text-default-600"}>
            Создание пользователя
          </span>
        </ModalHeader>
        <ModalBody>
          <UserCreateForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModelCreate;
