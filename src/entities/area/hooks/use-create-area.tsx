import { addToast } from "@heroui/react";
import { api } from "~/trpc/react";

export const useCreateArea = (onSuccess: () => void) => {
  const utils = api.useUtils();
  const create = api.area.areaCreate.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      onSuccess();
      addToast({
        title: "Успешно",
        description: "Сфера деятельности добавлена",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Ошибка",
        description: "Произошла неизвестная ошибка",
        color: "danger",
      });
    },
  });
  return create;
};
