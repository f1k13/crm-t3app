"use client";

import { Button, Form } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "~/entities/user/hooks/use-reset-password";
import { userResetPasswordSchema } from "~/entities/user/model/user.model";
import { FieldPassword } from "~/features/auth/ui";
import type { TUserResetPassword } from "~/server/api/dto/user/user.dto";

const ResetForm = () => {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const form = useForm({
    resolver: zodResolver(userResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
      token,
    },
  });
  const resetPassword = useResetPassword();

  const onSubmit = (data: TUserResetPassword) => {
    resetPassword.mutate({
      newPassword: data.newPassword,
      token: data.token,
    });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldPassword
        register={form.register("newPassword")}
        error={form.formState.errors.newPassword?.message}
      />
      <FieldPassword
        register={form.register("repeatPassword")}
        error={form.formState.errors.repeatPassword?.message}
        label={"Повторите пароль"}
      />
      <Button className={"w-full"} color={"primary"} type={"submit"}>
        Обновить
      </Button>
    </Form>
  );
};

export default ResetForm;
