import { SidebarTemplate } from "~/app/templates/sidebar";
import type { TSidebar } from "../model/sidebar";
import ListSidebar from "./list-sidebar";
import ThemeSwitcher from "~/features/theme/ui/theme-switcher";
import TopSidebar from "./top-sidebar";

const Sidebar = ({ list }: { list: TSidebar[] }) => {
  return (
    <SidebarTemplate
      list={<ListSidebar list={list} />}
      top={<TopSidebar />}
      bottom={<ThemeSwitcher />}
    />
  );
};

export default Sidebar;
