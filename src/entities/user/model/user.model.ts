import { z } from "zod";
import { RoleEnum } from "~/server/api/enums/role-enum";

export const userCreateSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
  role: z.enum([RoleEnum.ADMIN, RoleEnum.MANAGER]).default(RoleEnum.MANAGER),
});
