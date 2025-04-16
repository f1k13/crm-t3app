import { Button } from "@heroui/react";
import type { ReactNode } from "react";

const AddFieldButton = ({
  text,
  onClick,
}: {
  text: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button className={"text"} onPress={onClick} color={"secondary"}>
      {text}
    </Button>
  );
};

export default AddFieldButton;
