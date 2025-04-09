import { Input } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FieldLastNameProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
};

const FieldLastName = ({ register, error }: FieldLastNameProps) => {
  return (
    <Input
      {...register}
      placeholder={"Иванович"}
      label={"Введите отчество"}
      errorMessage={error}
      isInvalid={!!error}
    />
  );
};

export default FieldLastName;
