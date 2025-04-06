import { Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { IAuthType } from "~/entities/user/model/user.model";

const FieldPassword = ({ ...rest }: UseFormReturn<IAuthType>) => {
  const error = rest.formState.errors.password?.message;
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Input
      {...rest.register("password")}
      placeholder="Пароль"
      label="Введите пароль"
      errorMessage={error}
      type={isVisible ? "text" : "password"}
      isInvalid={!!error}
      isRequired
      endContent={
        isVisible ? (
          <EyeOff
            className={"cursor-pointer"}
            onClick={() => setIsVisible(false)}
          />
        ) : (
          <Eye
            className={"cursor-pointer"}
            onClick={() => setIsVisible(true)}
          />
        )
      }
    />
  );
};

export default FieldPassword;
