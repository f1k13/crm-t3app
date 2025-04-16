import Link from "next/link";
import type { TSidebar } from "../model/sidebar";
import { SidebarMenuButton, SidebarMenuItem } from "~/shared/ui/shadcn/sidebar";
import { usePathname } from "next/navigation";

const ListSidebar = ({ list }: { list: TSidebar[] }) => {
  const path = usePathname();

  return (
    <>
      {list.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton size={"lg"} isActive={item.link === path}>
            <Link className={"flex items-center gap-2"} href={item.link}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default ListSidebar;
