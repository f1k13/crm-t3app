import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export function useCreateLinkResetPassword() {
  const utils = api.useUtils();

  const resetPassword = api.admin.resetPasswordUser.useMutation({
    onSuccess: async (data) => {
      await utils.invalidate();
      await navigator.clipboard.writeText(data.link);
      addToast({
        title: "Успешно",
        description: "Ссылка для сброса пароля скопирована",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Ошибка",
        description: "Произошла ошибка при копировании ссылки",
        color: "danger",
      });
    },
  });
  return resetPassword;
}
