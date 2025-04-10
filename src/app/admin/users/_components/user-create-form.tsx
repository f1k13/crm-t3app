import React, { useState } from "react";
import { useCreate } from "~/entities/user/hooks/use-create";
import { RoleEnum } from "~/server/api/enums/role-enum";
import {
  userCreateSchema,
  type TUserCreateType,
} from "~/entities/user/model/user.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UserForm from "~/widgets/users/ui/user-form";
import TokenSnippet from "~/features/user/ui/token-snippet";
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

  const onSubmit = (data: TUserCreateType) => {
    create.mutate(data);
  };
  return (
    <>
      {link ? (
        <TokenSnippet token={link} />
      ) : (
        <UserForm form={form} handleSubmit={onSubmit} />
      )}
    </>
  );
};

export default UserCreateForm;
