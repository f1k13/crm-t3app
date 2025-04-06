import { Input } from "@heroui/react";
import type { UseFormReturn } from "react-hook-form";
import type { IAuthType } from "~/entities/user/model/user.model";

const FieldLogin = ({ ...rest }: UseFormReturn<IAuthType>) => {
  const error = rest.formState.errors.login?.message;
  return (
    <Input
      {...rest.register("login")}
      placeholder={"Логин"}
      label={"Введите логин"}
      errorMessage={error}
      isInvalid={!!error}
      isRequired
    />
  );
};

export default FieldLogin;
