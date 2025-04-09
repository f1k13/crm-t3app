import { z } from "zod";
import { RoleEnum } from "~/server/api/enums/role-enum";

export const authSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type IAuthType = z.infer<typeof authSchema>;

export const userCreateSchema = authSchema.extend({
  email: z
    .string()
    .min(1, "Email обязателен")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Некорректный email",
    ),
  firstName: z.string().min(1, "Имя обязательно"),
  middleName: z.string().min(1, "Фамилия обязательна"),
  lastName: z.string(),
  role: z.enum([RoleEnum.ADMIN, RoleEnum.RKM, RoleEnum.KM]),
});

export type TUserCreateType = z.infer<typeof userCreateSchema>;

export const roleData = [
  {
    key: RoleEnum.ADMIN,
    label: "Админ",
  },
  {
    key: RoleEnum.KM,
    label: "Менеджер",
  },
  {
    key: RoleEnum.RKM,
    label: "Руководитель отдела",
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
