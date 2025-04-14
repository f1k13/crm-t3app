import { Button } from "@heroui/react";
import React from "react";

const ButtonCreateCompany = ({ onOpen }: { onOpen: () => void }) => {
  return <Button onPress={onOpen}>Добавить клиента</Button>;
};

export default ButtonCreateCompany;
