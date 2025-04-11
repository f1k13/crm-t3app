"use client";

import { useMemo } from "react";
import ThemeSwitcher from "~/features/theme/ui/theme-switcher";
import { RoleEnum } from "~/server/api/enums/role-enum";
import { useSession } from "~/shared/hooks/use-session";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "~/shared/ui/sidebar";
import { adminSidebar } from "~/widgets/sidebar/model/sidebar";
import ListSidebar from "~/widgets/sidebar/ui/list-sidebar";
import TopSidebar from "~/widgets/sidebar/ui/top-sidebar";
import AppSidebarSkeleton from "../skeletons/app-sidebar-skeleton";
import If from "~/features/abstract/if";

const AppSidebar = () => {
  const { user, isLoading } = useSession();

  const renderMenu = useMemo(() => {
    switch (user?.role) {
      case RoleEnum.ADMIN: {
        return <ListSidebar list={adminSidebar} />;
      }
    }
  }, [user]);
  return (
    <Sidebar>
      <SidebarHeader>
        <TopSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <If fallback={<AppSidebarSkeleton />} condition={!isLoading}>
              <SidebarMenu>{renderMenu}</SidebarMenu>
            </If>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
