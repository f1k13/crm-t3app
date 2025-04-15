import { Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";

const FieldComment = () => {
  const { register } = useFormContext();
  return (
    <Textarea
      maxRows={2}
      {...register("comment")}
      placeholder={"Комментарий..."}
      label={"Введите комментарий"}
    />
  );
};

export default FieldComment;
