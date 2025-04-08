import type { ReactNode } from "react";
import AppSidebar from "./app-sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex h-screen w-screen items-start"}>
      <AppSidebar />
      <div className={"px-4 py-6"}>{children}</div>
    </div>
  );
};

export default AdminLayout;
