import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export const useCreateCompany = () => {
  const utils = api.useUtils();

  const create = api.company.create.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      addToast({
        title: "Успешно",
        description: "Клиент добавлен",
        color: "success",
      });
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
