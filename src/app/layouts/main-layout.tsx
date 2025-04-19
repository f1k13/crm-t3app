import type { ReactNode } from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider } from "~/shared/ui/shadcn/sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className={"flex h-screen w-screen"}>
        <AppSidebar />
        <div className={"w-full px-4 py-20"}>{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
