import { Button, Form, Input } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateArea } from "~/entities/area/hooks/use-create-area";
import type { TCreateArea } from "~/entities/area/model/area.model";

const AreaForm = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const create = useCreateArea(onClose);

  const onSubmit = (data: TCreateArea) => {
    create.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        placeholder={"Ремонт дорог"}
        label={"Название сферы деятельности"}
      />
      <Button type={"submit"} color={"primary"} className={"w-full"}>
        Создать
      </Button>
    </Form>
  );
};

export default AreaForm;
