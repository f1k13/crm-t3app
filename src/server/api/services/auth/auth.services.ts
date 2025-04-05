import { userDataSchema } from "../../dto/user/user.dto";
import { publicProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { users } from "~/server/db/schemas/user.schema";
import { TRPCError } from "@trpc/server";

const secretKey = env.JWT_SECRET;

const signIn = publicProcedure
  .input(userDataSchema)
  .mutation(async ({ ctx, input }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.login, input.login));

    if (!user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Пользователя нет в системе",
      });

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
  });

export const authService = {
  signIn,
};
