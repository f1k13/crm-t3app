"use client";

import Link from "next/link";
import type { TSidebar } from "../model/sidebar";
import { SidebarMenuButton, SidebarMenuItem } from "~/shared/ui/sidebar";

const ListSidebar = ({ list }: { list: TSidebar[] }) => {
  return (
    <>
      {list.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.link}>
              <item.icon className="h-15 w-15" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default ListSidebar;
