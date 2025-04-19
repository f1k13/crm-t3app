import Link from "next/link";
import type { TSidebar } from "../model/sidebar";
import { SidebarMenuButton, SidebarMenuItem } from "~/shared/ui/shadcn/sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const ListSidebar = ({ list }: { list: TSidebar[] }) => {
  const path = usePathname();

  return (
    <>
      {list.map((item) => {
        const isActive = item.link === path;

        return (
          <Link key={item.title} href={item.link} className="w-full">
            <SidebarMenuItem className="w-full">
              <SidebarMenuButton
                size="lg"
                isActive={isActive}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-primary shadow-md"
                    : "hover:bg-muted hover:text-foreground/90",
                )}
              >
                <item.icon
                  className={clsx(
                    "h-10 w-10 transition-colors",
                    "text-muted-foreground",
                  )}
                />
                <span className="text-base font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        );
      })}
    </>
  );
};

export default ListSidebar;
