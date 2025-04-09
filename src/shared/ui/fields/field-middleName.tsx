import { Input } from "@heroui/react";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FieldMiddleNameProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
};
const FieldMiddleName = ({ register, error }: FieldMiddleNameProps) => {
  return (
    <Input
      {...register}
      placeholder={"Иванов"}
      label={"Введите фамилию"}
      errorMessage={error}
      isInvalid={!!error}
      isRequired
    />
  );
};

export default FieldMiddleName;
