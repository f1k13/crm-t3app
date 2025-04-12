import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useDeleteUsers } from "~/entities/user/hooks/use-delete-users";
import { useUserStore } from "~/entities/user/model/store";

const UserConfirmDeletedModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { selectedDeletedUsers, clearSelectedDeletedUsers } = useUserStore(
    (state) => state,
  );

  const deleted = useDeleteUsers({
    onSuccess: () => {
      onClose();
      clearSelectedDeletedUsers();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className={"flex items-center justify-center"}>
          Подтверждение удаления
        </ModalHeader>
        <ModalBody className={"flex items-center justify-center"}>
          <div className={"flex items-center gap-2"}>
            <span>Вы действительно хотите удалить</span>
            <span className="font-semibold text-red-600">
              {selectedDeletedUsers.length}
            </span>
            <span>
              {selectedDeletedUsers.length === 1
                ? "пользователя?"
                : "пользователей?"}
            </span>
          </div>
        </ModalBody>
        <ModalFooter className={"flex w-full items-center"}>
          <Button color={"danger"} className={"w-full"} onClick={onClose}>
            Отмена
          </Button>
          <Button
            color={"primary"}
            className={"w-full"}
            onClick={() => deleted.mutate({ userIds: selectedDeletedUsers })}
          >
            Подтвердить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserConfirmDeletedModal;
