import React, { useState } from "react";
import { useCreate } from "~/entities/user/hooks/use-create";
import { RoleEnum } from "~/server/api/enums/role-enum";
import {
  userCreateSchema,
  type TUserCreateType,
  type UserFormValues,
} from "~/entities/user/model/user.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import UserForm from "~/widgets/users/ui/user-form";
import TokenSnippet from "~/features/user/ui/token-snippet";
import { FieldPassword } from "~/features/auth/ui";
import { Button } from "@heroui/react";
const UserCreateForm = () => {
  const [link, setLink] = useState<string>("");

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
  const create = useCreate({
    onSuccess: (link) => setLink(link),
  });

  const onSubmit = (data: UserFormValues) => {
    create.mutate(data as TUserCreateType);
  };
  return (
    <>
      {link ? (
        <TokenSnippet token={link} />
      ) : (
        <UserForm
          renderPassword={() => (
            <FieldPassword
              register={form.register("password")}
              error={form.formState.errors.password?.message}
            />
          )}
          renderButton={() => (
            <Button color={"primary"} className={"w-full"} type={"submit"}>
              Создать
            </Button>
          )}
          form={form as UseFormReturn<UserFormValues>}
          handleSubmit={onSubmit}
          requireLogin
        />
      )}
    </>
  );
};

export default UserCreateForm;
