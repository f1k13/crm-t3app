import { ListOrdered, Users } from "lucide-react";
import type { ReactNode } from "react";
import { ADMIN_ORDERS_LINK, ADMIN_USERS_LINK } from "~/shared/constants/links";

export type TSidebar = {
  title: string;
  icon: ReactNode;
  link: string;
};

export const adminSideBar: TSidebar[] = [
  {
    title: "Пользователи",
    icon: <Users className="h-5 w-5" />,
    link: ADMIN_USERS_LINK,
  },
  {
    title: "Заказы",
    icon: <ListOrdered className="h-5 w-5" />,
    link: ADMIN_ORDERS_LINK,
  },
];
