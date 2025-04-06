import { z } from "zod";

export interface IUserData {
  login: string;
  password: string;
}

export const userDataSchema = z.object({
  login: z.string().min(1, "login is req"),
  password: z.string().min(1, "password is req"),
});

export const getAllSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
});
