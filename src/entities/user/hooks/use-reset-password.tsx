import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useResetPassword() {
  const utils = api.useUtils();
  const router = useRouter();
  const resetPassword = api.user.resetPassword.useMutation({
    onSuccess: async () => {
      await utils.invalidate();

      addToast({
        title: "Успешно",
        description: "Пароль успешно изменен",
        color: "success",
      });

      router.push("/auth/sign-in");
    },
    onError: (data) => {
      addToast({
        title: "Ошибка",
        description: data.message,
        color: "danger",
      });
    },
  });
  return resetPassword;
}
