import { ListOrdered, Users } from "lucide-react";
import type { JSX } from "react";
import {
  ADMIN_ORDERS_LINK,
  ADMIN_USERS_LINK,
  MAIN_ORDERS_LINK,
} from "~/shared/constants/links";

export type TSidebar = {
  title: string;
  icon: JSX.ElementType;
  link: string;
};

export const adminSidebar: TSidebar[] = [
  {
    title: "Пользователи",
    icon: Users,
    link: ADMIN_USERS_LINK,
  },
  {
    title: "Заказы",
    icon: ListOrdered,
    link: ADMIN_ORDERS_LINK,
  },
];

export const managerSidebar: TSidebar[] = [
  {
    title: "Заказы",
    icon: ListOrdered,
    link: MAIN_ORDERS_LINK,
  },
];
