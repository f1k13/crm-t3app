import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export function useDeleteUsers({ onSuccess }: { onSuccess: () => void }) {
  const utils = api.useUtils();

  const deleted = api.admin.deleteUsers.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      onSuccess();
      addToast({
        title: "Успешно",
        description: "Пользователи успешно удалены",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении пользователей",
        color: "danger",
      });
    },
  });
  return deleted;
}
