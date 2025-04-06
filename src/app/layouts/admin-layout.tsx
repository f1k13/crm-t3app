import type { ReactNode } from "react";
import { adminSideBar } from "~/widgets/sidebar/model/sidebar";
import AdminSidebar from "~/widgets/sidebar/ui/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex h-screen w-screen items-start justify-between"}>
      <AdminSidebar list={adminSideBar} />
      {children}
    </div>
  );
};

export default AdminLayout;
