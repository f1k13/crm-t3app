import type { ReactNode } from "react";
import AdminLayout from "../layouts/admin-layout";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
