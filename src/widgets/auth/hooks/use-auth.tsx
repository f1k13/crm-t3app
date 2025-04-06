import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RoleEnum } from "~/server/api/enums/role-enum";
import { ADMIN_USERS_LINK, MAIN_LINK } from "~/shared/constants/links";
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
        if (data.user.role === RoleEnum.ADMIN) {
          router.push(ADMIN_USERS_LINK);
        } else {
          router.push(MAIN_LINK);
        }
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
