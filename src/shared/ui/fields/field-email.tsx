import { Input } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FieldEmailProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
};

const FieldEmail = ({ register, error }: FieldEmailProps) => {
  return (
    <Input
      {...register}
      placeholder={"example@gmail.com"}
      label={"Введите почту"}
      errorMessage={error}
      isInvalid={!!error}
      isRequired
    />
  );
};

export default FieldEmail;
