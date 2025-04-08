"use client";

import { useMemo } from "react";
import ThemeSwitcher from "~/features/theme/ui/theme-switcher";
import { RoleEnum } from "~/server/api/enums/role-enum";
import { useSession } from "~/shared/hooks/use-session";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/shared/ui/sidebar";
import { adminSidebar } from "~/widgets/sidebar/model/sidebar";
import ListSidebar from "~/widgets/sidebar/ui/list-sidebar";
import TopSidebar from "~/widgets/sidebar/ui/top-sidebar";

const AppSidebar = () => {
  const { user } = useSession();

  const renderMenu = useMemo(() => {
    switch (user?.role) {
      case RoleEnum.ADMIN: {
        return <ListSidebar list={adminSidebar} />;
      }
    }
  }, [user]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <TopSidebar />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <ThemeSwitcher />
    </Sidebar>
  );
};

export default AppSidebar;
