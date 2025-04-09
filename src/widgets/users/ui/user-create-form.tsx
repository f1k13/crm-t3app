import { Button, Form } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreate } from "~/entities/user/hooks/use-create";
import {
  userCreateSchema,
  type TUserCreateType,
} from "~/entities/user/model/user.model";
import { FieldLogin, FieldPassword } from "~/features/auth/ui";
import FieldFirstName from "~/shared/ui/fields/field-firstName";
import FieldMiddleName from "~/shared/ui/fields/field-middleName";
import SelectRole from "~/features/user/ui/select-role";
import { RoleEnum } from "~/server/api/enums/role-enum";
import FieldEmail from "~/shared/ui/fields/field-email";
import FieldLastName from "~/shared/ui/fields/field-lastName";

const UserCreateForm = () => {
  const form = useForm({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      login: "",
      password: "",
      role: RoleEnum.KM,
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  });

  const create = useCreate();

  const onSubmit = (data: TUserCreateType) => {
    create.mutate(data);
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldLogin
        register={form.register("login")}
        error={form.formState.errors.login?.message}
      />
      <FieldPassword
        register={form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <FieldFirstName
        register={form.register("firstName")}
        error={form.formState.errors.firstName?.message}
      />
      <FieldMiddleName
        register={form.register("middleName")}
        error={form.formState.errors.middleName?.message}
      />
      <FieldLastName
        register={form.register("lastName")}
        error={form.formState.errors.lastName?.message}
      />
      <FieldEmail
        register={form.register("email")}
        error={form.formState.errors.email?.message}
      />
      <SelectRole
        value={form.watch("role")}
        onClick={(key) => form.setValue("role", key)}
      />
      <Button color={"primary"} className={"w-full"} type={"submit"}>
        Создать
      </Button>
    </Form>
  );
};

export default UserCreateForm;
