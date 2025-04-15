import { Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";

const FieldComment = () => {
  const { register } = useFormContext();
  return (
    <Textarea
      {...register("comment")}
      placeholder={"Комментарий..."}
      label={"Введите комментарий"}
    />
  );
};

export default FieldComment;
