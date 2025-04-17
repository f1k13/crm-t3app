import Link from "next/link";
import type { TSidebar } from "../model/sidebar";
import { SidebarMenuButton, SidebarMenuItem } from "~/shared/ui/shadcn/sidebar";
import { usePathname } from "next/navigation";

const ListSidebar = ({ list }: { list: TSidebar[] }) => {
  const path = usePathname();

  return (
    <>
      {list.map((item) => (
        <Link
          key={item.title}
          className={"flex w-full items-center gap-2"}
          href={item.link}
        >
          <SidebarMenuItem className={"w-full"}>
            <SidebarMenuButton size={"lg"} isActive={item.link === path}>
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      ))}
    </>
  );
};

export default ListSidebar;
