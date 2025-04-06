import { z } from "zod";
import { RoleEnum } from "~/server/api/enums/role-enum";

export const authSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type IAuthType = z.infer<typeof authSchema>;

export const userCreateSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
  role: z.enum([RoleEnum.ADMIN, RoleEnum.MANAGER]).default(RoleEnum.MANAGER),
});

export type TUserCreateType = z.infer<typeof userCreateSchema>;

export const roleData = [
  {
    key: RoleEnum.ADMIN,
    label: "Админ",
  },
  {
    key: RoleEnum.MANAGER,
    label: "Менеджер",
  },
];

export const userFields = [
  {
    key: "login",
    label: "Логин",
  },
  {
    key: "role",
    label: "Роль",
  },
];

export interface IUser {
  id: string;
  role: RoleEnum;
  login: string;
  createdAt: Date;
}
