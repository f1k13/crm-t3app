import { Input } from "@heroui/react";
import type { UseFormReturn } from "react-hook-form";
import type { IAuthType } from "~/entities/auth/model/auth.model";

const FieldPassword = ({ ...rest }: UseFormReturn<IAuthType>) => {
  const error = rest.formState.errors.password?.message;
  return (
    <Input
      {...rest.register("password")}
      placeholder="Пароль"
      label="Введите пароль"
      errorMessage={error}
    />
  );
};

export default FieldPassword;
