import type { ReactNode } from "react";
import { managerSidebar } from "~/widgets/sidebar/model/sidebar";
import Sidebar from "~/widgets/sidebar/ui/sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex h-screen w-screen items-start"}>
      <Sidebar list={managerSidebar} />
      <div className={"px-4 py-6"}>{children}</div>
    </div>
  );
};

export default MainLayout;
