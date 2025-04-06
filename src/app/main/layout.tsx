import type { ReactNode } from "react";
import MainLayout from "../layouts/main-layout";

const Layout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
