import { Button } from "@heroui/react";

const ButtonModalOpen = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant={"solid"} onClick={onClick}>
      <span>Создать пользователя</span>
    </Button>
  );
};

export default ButtonModalOpen;
