import type { ReactNode } from "react";
import ThemeSwitcher from "~/features/theme/ui/theme-switcher";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children} <ThemeSwitcher />
    </div>
  );
};

export default AdminLayout;
