import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";

const AppendButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button color={"success"} onPress={onClick} variant={"flat"} isIconOnly>
      <Plus />
    </Button>
  );
};

export default AppendButton;
