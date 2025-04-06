import { Button, Form } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreate } from "~/entities/user/hooks/use-create";
import {
  userCreateSchema,
  type TUserCreateType,
} from "~/entities/user/model/user.model";
import { FieldLogin, FieldPassword } from "~/features/auth/ui";
import SelectRole from "~/features/user/ui/select-role";
import { RoleEnum } from "~/server/api/enums/role-enum";

const UserCreateForm = () => {
  const form = useForm({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      login: "",
      password: "",
      role: RoleEnum.MANAGER,
    },
  });

  const create = useCreate();

  const onSubmit = (data: TUserCreateType) => {
    create.mutate(data);
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldLogin {...form} />
      <FieldPassword {...form} />
      <SelectRole
        value={form.watch("role")!}
        onClick={(key) => form.setValue("role", key)}
      />
      <Button color={"primary"} className={"w-full"} type={"submit"}>
        Создать
      </Button>
    </Form>
  );
};

export default UserCreateForm;
