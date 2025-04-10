import { Button, Form } from "@heroui/react";

import { FieldLogin, FieldPassword } from "~/features/auth/ui";
import FieldFirstName from "~/shared/ui/fields/field-firstName";
import FieldMiddleName from "~/shared/ui/fields/field-middleName";
import SelectRole from "~/features/user/ui/select-role";
import FieldEmail from "~/shared/ui/fields/field-email";
import FieldLastName from "~/shared/ui/fields/field-lastName";
import type { UseFormReturn } from "react-hook-form";
import type { TUserCreateType } from "~/entities/user/model/user.model";

const UserForm = ({
  handleSubmit,
  form,
}: {
  handleSubmit: (data: TUserCreateType) => void;
  form: UseFormReturn<TUserCreateType>;
}) => {
  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
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

export default UserForm;
