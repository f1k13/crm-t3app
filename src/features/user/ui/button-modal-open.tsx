import { Button } from "@heroui/react";
import { PlusCircleIcon } from "lucide-react";

const ButtonModalOpen = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button color={"primary"} variant={"solid"} onClick={onClick}>
      <PlusCircleIcon />
      <span>Создать пользователя</span>
    </Button>
  );
};

export default ButtonModalOpen;
