import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";

const ButtonModalOpen = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button color={"primary"} variant={"solid"} onClick={onClick}>
      <PlusIcon />
      <span>Создать пользователя</span>
    </Button>
  );
};

export default ButtonModalOpen;
