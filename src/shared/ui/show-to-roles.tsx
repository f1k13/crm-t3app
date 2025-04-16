import React, { type ReactNode } from "react";
import { useUserStore } from "~/entities/user/model/store";
import If from "~/features/abstract/if";
import { RoleEnum } from "~/server/api/enums/role-enum";

const ShowToRoles = ({
  roles,
  children,
}: {
  roles: RoleEnum[];
  children: ReactNode;
}) => {
  const { currentUser } = useUserStore((state) => state);

  return (
    <If condition={roles.includes(currentUser?.role ?? RoleEnum.KM)}>
      {children}
    </If>
  );
};

export default ShowToRoles;
