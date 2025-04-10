import { z } from "zod";
import { RoleEnum } from "../../enums/role-enum";
export const authDataSchema = z.object({
  login: z.string().min(1, "login is req"),
  password: z.string().min(1, "password is req"),
});
export const userDataSchema = z.object({
  login: z.string().min(1, "login is req"),
  password: z.string().min(1, "password is req"),
  firstName: z.string().min(1, "firstName is req"),
  middleName: z.string().min(1, "middleName is req"),
  lastName: z.string(),
  email: z.string(),
});
export const getAllUserSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
});
export const getUserByIdSchema = z.object({
  id: z.string().min(1),
});

export const editUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  role: z.enum([RoleEnum.ADMIN, RoleEnum.RKM, RoleEnum.KM]),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
});

export const getUserByLoginSchema = z.object({
  login: z.string().min(1),
});

export const confirmUserSchema = z.object({
  confirm: z.boolean(),
  id: z.string().min(1),
});

export const verifyUserSchema = z.object({
  token: z.string().min(1),
});
