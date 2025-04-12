import { type authDataSchema, type TVerifyUser } from "../../dto/user/user.dto";
import { type TContext } from "../../trpc";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { users } from "~/server/db/schemas/user.schema";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";
import { userRepository } from "../../repository/user/user.repository";
type TSignInInput = z.infer<typeof authDataSchema>;

const secretKey = env.JWT_SECRET;
const signIn = async (ctx: TContext, input: TSignInInput) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where(eq(users.login, input.login));
  if (!user)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователя нет в системе",
    });
  if (!user?.isConfirmed) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Пользователь не подтвержден",
    });
  }

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пароль неверный",
    });

  const token = jwt.sign({ sub: user.id }, secretKey, {
    expiresIn: "7d",
  });

  ctx.cookies?.set("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    user,
    token,
  };
};
const authVerify = async (ctx: TContext, input: TVerifyUser) => {
  const decode = jwt.verify(input.token, secretKey) as { sub: string };
  if (!decode.sub) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Время истекло" });
  }

  const user = await userRepository.findById(ctx.db, decode.sub);
  if (!user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь не найден",
    });
  }
  if (user.isConfirmed) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь подтвержден",
    });
  }
  await userRepository.setConfirmed(ctx.db, user.id, true);

  return { message: "Успешная верификация" };
};
export const authService = {
  signIn,
  authVerify,
};
