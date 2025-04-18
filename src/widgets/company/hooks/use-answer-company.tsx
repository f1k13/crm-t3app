import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { useUserStore } from "~/entities/user/model/store";
import { RoleEnum } from "~/server/api/enums/role-enum";

export function useAnswerCompany() {
  const { currentUser } = useUserStore((state) => state);

  const { setValue } = useFormContext<TCompanyFormValues>();

  useEffect(() => {
    if (currentUser?.role === RoleEnum.KM) {
      setValue("answerId", currentUser.id);
    }
  }, [currentUser?.id, currentUser?.role, setValue]);
}
