import { Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
type FieldPasswordProps = {
  register: UseFormRegisterReturn;
  error: string | undefined;
  label?: string;
};
const FieldPassword = ({
  register,
  error,
  label = "Введите пароль",
}: FieldPasswordProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Input
      {...register}
      placeholder="Пароль"
      label={label}
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
