import { Input } from "@heroui/react";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
type FieldFirstNameProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
};
const FieldFirstName = ({ register, error }: FieldFirstNameProps) => {
  return (
    <Input
      {...register}
      placeholder={"Вячеслав"}
      label={"Введите имя"}
      errorMessage={error}
      isInvalid={!!error}
      isRequired
    />
  );
};

export default FieldFirstName;
