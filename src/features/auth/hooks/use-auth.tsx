import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MAIN_LINK } from "~/shared/constants/links";
import { api } from "~/trpc/react";

export function useAuth() {
  const utils = api.useUtils();
  const router = useRouter();
  const signIn = api.auth.signIn.useMutation({
    onSuccess: async (data) => {
      await utils.auth.invalidate();
      addToast({
        title: "Успешно",
        description: "Успешный вход в систему",
        color: "success",
      });
      document.cookie = `token=${data.token}; path=/`;
      router.push(MAIN_LINK);
    },
    onError: async (data) => {
      addToast({
        title: "Ошибка",
        description: data.message,
        color: "danger",
      });
    },
  });
  return signIn;
}
