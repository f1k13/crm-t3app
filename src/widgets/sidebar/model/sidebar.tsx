import { Building2, ComputerIcon, ListOrdered, Users } from "lucide-react";
import type { JSX } from "react";
import {
  ADMIN_DEALS_LINK,
  ADMIN_USERS_LINK,
  COMPANY_LINK,
  MAIN_DEALS_LINK,
  MAIN_LINK,
} from "~/shared/constants/links";

export type TSidebar = {
  title: string;
  icon: JSX.ElementType;
  link: string;
};

export const adminSidebar: TSidebar[] = [
  {
    title: "Главная",
    icon: ComputerIcon,
    link: MAIN_LINK,
  },
  {
    title: "Пользователи",
    icon: Users,
    link: ADMIN_USERS_LINK,
  },
  {
    title: "Сделки",
    icon: ListOrdered,
    link: ADMIN_DEALS_LINK,
  },
  {
    title: "Клиенты",
    icon: Building2,
    link: COMPANY_LINK,
  },
];

export const managerSidebar: TSidebar[] = [
  {
    title: "Главная",
    icon: ComputerIcon,
    link: MAIN_LINK,
  },
  {
    title: "Сделки",
    icon: ListOrdered,
    link: MAIN_DEALS_LINK,
  },
  {
    title: "Клиенты",
    icon: Building2,
    link: COMPANY_LINK,
  },
];
