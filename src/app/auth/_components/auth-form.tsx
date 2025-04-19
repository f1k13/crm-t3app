"use client";

import { Button, Form, Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { FieldLogin, FieldPassword } from "~/features/auth/ui";
import { authSchema, type IAuthType } from "~/entities/user/model/user.model";
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
      <FieldLogin
        register={form.register("login")}
        error={form.formState.errors.login?.message}
      />
      <FieldPassword
        register={form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <Button color={"primary"} className={"w-full"} type={"submit"}>
        {signIn.isPending ? <Spinner color={"current"} /> : "Логин"}
      </Button>
    </Form>
  );
};

export default AuthForm;
