import { Input } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FieldLoginProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
};

const FieldLogin = ({ register, error }: FieldLoginProps) => {
  return (
    <Input
      {...register}
      placeholder="Логин"
      label="Введите логин"
      errorMessage={error}
      isInvalid={!!error}
      isRequired
    />
  );
};

export default FieldLogin;
