import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export const useCreate = () => {
  const utils = api.useUtils();
  const create = api.admin.createUser.useMutation({
    onSuccess: async () => {
      await utils.admin.invalidate();
      addToast({
        title: "Успешно",
        description: "Пользователь добавлен в систему",
        color: "success",
      });
    },
    onError: async (data) => {
      console.log(data);
      addToast({
        title: "Ошибка",
        description: data.message,
        color: "danger",
      });
    },
  });
  return create;
};
