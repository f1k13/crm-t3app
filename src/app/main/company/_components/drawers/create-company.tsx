import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import CreateFormCompany from "../forms/create";

const CreateCompany = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer size={"5xl"} isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>Добавление нового клиента</DrawerHeader>
        <DrawerBody>
          <CreateFormCompany />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCompany;
