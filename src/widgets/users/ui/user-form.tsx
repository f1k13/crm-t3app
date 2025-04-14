import { Form } from "@heroui/react";
import { FieldLogin } from "~/features/auth/ui";
import FieldFirstName from "~/features/user/ui/fields/field-firstName";
import FieldMiddleName from "~/features/user/ui/fields/field-middleName";
import SelectRole from "~/features/user/ui/fields/select-role";
import FieldEmail from "~/features/user/ui/fields/field-email";
import FieldLastName from "~/features/user/ui/fields/field-lastName";
import type { UseFormReturn } from "react-hook-form";
import type { UserFormValues } from "~/entities/user/model/user.model";
import type { ReactNode } from "react";
import { RoleEnum } from "~/server/api/enums/role-enum";

type UserFormProps = {
  handleSubmit?: (data: UserFormValues) => void;
  form: UseFormReturn<UserFormValues>;
  renderPassword?: () => ReactNode;
  renderButton?: () => ReactNode;
  requireLogin?: boolean;
};

const UserForm = ({
  handleSubmit,
  form,
  renderPassword,
  renderButton,
  requireLogin = true,
}: UserFormProps) => {
  return (
    <Form onSubmit={handleSubmit ? form.handleSubmit(handleSubmit) : undefined}>
      {requireLogin && (
        <FieldLogin
          register={form.register("login")}
          error={form.formState.errors.login?.message}
        />
      )}
      {renderPassword?.()}
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
        value={form.watch("role") ?? RoleEnum.KM}
        onClick={(key) => form.setValue("role", key)}
      />
      {renderButton?.()}
    </Form>
  );
};

export default UserForm;
