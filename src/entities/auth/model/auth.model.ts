import { z } from "zod";

export const authSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type IAuthType = z.infer<typeof authSchema>;
