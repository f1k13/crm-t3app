import { Input } from "@heroui/react";
import { useController } from "react-hook-form";

type ControlledInputProps = {
  name: string;
  placeholder?: string;
};

const ControlledInput = ({ name, placeholder }: ControlledInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Input
      {...field}
      placeholder={placeholder}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};

export default ControlledInput;
