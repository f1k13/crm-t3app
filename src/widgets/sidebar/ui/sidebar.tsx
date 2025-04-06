"use client";

import { SidebarTemplate } from "~/app/templates/sidebar";
import type { TSidebar } from "../model/sidebar";
import ListSidebar from "./list-sidebar";
import ThemeSwitcher from "~/features/theme/ui/theme-switcher";
import TopSidebar from "./top-sidebar";
import { useSession } from "~/shared/hooks/use-session";
import { User } from "@heroui/react";

const Sidebar = ({ list }: { list: TSidebar[] }) => {
  const { user } = useSession();
  return (
    <SidebarTemplate
      list={<ListSidebar list={list} />}
      top={<TopSidebar />}
      bottom={
        <>
          <User name={user?.login} description={user?.role} />
          <ThemeSwitcher />
        </>
      }
    />
  );
};

export default Sidebar;
