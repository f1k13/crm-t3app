"use client";

import { Button, Form } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "~/shared/hooks/use-auth";
import FieldLogin from "~/widgets/auth/ui/field-login";
import FieldPassword from "~/widgets/auth/ui/field-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type IAuthType } from "~/entities/auth/model/auth.model";
const AuthForm = () => {
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const signIn = useAuth();

  const onSubmit = (data: IAuthType) => {
    signIn.mutate(data);
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldLogin {...form} />
      <FieldPassword {...form} />
      <Button color={"primary"} className={"w-full"} type={"submit"}>
        Войти
      </Button>
    </Form>
  );
};

export default AuthForm;
