import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React from "react";
import AreaForm from "./area-form";
import AreaList from "./area-list";
import ShowToRoles from "~/shared/ui/show-to-roles";
import { RoleEnum } from "~/server/api/enums/role-enum";

const AreaModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ShowToRoles roles={[RoleEnum.ADMIN]}>
      <Button color={"primary"} onPress={onOpen}>
        Сферы деятельности
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <span>Сферы деятельности</span>
          </ModalHeader>
          <ModalBody>
            <AreaForm onClose={onClose} />
            <AreaList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ShowToRoles>
  );
};

export default AreaModal;
