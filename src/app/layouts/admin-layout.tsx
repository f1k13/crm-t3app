import type { ReactNode } from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider } from "~/shared/ui/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className={"flex h-screen w-screen items-start"}>
        <AppSidebar />
        <div className={"px-4 py-6"}>{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
