"use client";

import { useEffect, type ReactNode } from "react";
import MainLayout from "../layouts/main-layout";
import { useUserStore } from "~/entities/user/model/store";
import { RoleEnum } from "~/server/api/enums/role-enum";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useUserStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (currentUser?.role !== RoleEnum.ADMIN) {
      router.push("/main");
    }
  }, [currentUser, router]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
