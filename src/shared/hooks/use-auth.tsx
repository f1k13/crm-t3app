import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
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
      setTimeout(() => {
        router.push("/main");
      }, 2000);
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
