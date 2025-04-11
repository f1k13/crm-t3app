import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export const useCreate = ({
  onSuccess,
}: {
  onSuccess: (link: string) => void;
}) => {
  const utils = api.useUtils();
  const create = api.admin.createUser.useMutation({
    onSuccess: async (data) => {
      await utils.admin.invalidate();
      addToast({
        title: "Успешно",
        description: "Пользователь добавлен в систему",
        color: "success",
      });
      onSuccess(data.link);
    },
    onError: (data) => {
      addToast({
        title: "Ошибка",
        description: data.message,
        color: "danger",
      });
    },
  });
  return create;
};
