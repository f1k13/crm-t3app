import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export const useEdit = ({ onSuccess }: { onSuccess: () => void }) => {
  const utils = api.useUtils();
  const edit = api.admin.editUser.useMutation({
    onSuccess: async () => {
      await utils.admin.invalidate();

      addToast({
        title: "Успешно",
        description: "Пользователь успешно обновлен",
        color: "success",
      });
      onSuccess();
    },
    onError: () => {
      addToast({
        title: "Ошибка",
        description: "Произошла ошибка при обновлении",
        color: "danger",
      });
    },
  });
  return edit;
};
