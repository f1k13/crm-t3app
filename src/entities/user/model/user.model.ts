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
export const userEditSchema = z.object({
  id: z.string().min(1),
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

export type TUserEditType = z.infer<typeof userEditSchema>;

export type UserFormValues = Partial<TUserCreateType> & Partial<TUserEditType>;

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
  {
    key: "email",
    label: "Email",
  },
  {
    key: "firstName",
    label: "Имя",
  },
  {
    key: "middleName",
    label: "Фамилия",
  },
  {
    key: "lastName",
    label: "Отчество",
  },
  {
    key: "createdAt",
    label: "Дата создания",
  },
  {
    key: "actions",
    label: "Действия",
  },
];

export interface IUser {
  id: string;
  login: string;
  password: string;
  role: RoleEnum;
  email: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  isConfirmed: boolean | null;
  createdAt: Date;
}

export const ROLES = {
  [RoleEnum.ADMIN]: "Админ",
  [RoleEnum.KM]: "Менеджер",
  [RoleEnum.RKM]: "Руководитель отдела",
};
