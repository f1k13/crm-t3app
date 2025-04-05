import type { ReactNode } from "react";
import AuthLayout from "../layouts/auth-layout";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
