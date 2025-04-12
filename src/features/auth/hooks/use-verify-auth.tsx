import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useVerifyAuth() {
  const utils = api.useUtils();
  const router = useRouter();
  const confirm = api.auth.verify.useMutation({
    retry: false,
    onSuccess: async (data) => {
      await utils.invalidate();
      addToast({
        title: "Успешно",
        description: data.message,
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
  return confirm;
}
