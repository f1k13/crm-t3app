import { createTRPCRouter } from "../../trpc";

import { userDataSchema } from "../../dto/user/user.dto";
import { publicProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { users } from "~/server/db/schema";
import { cookies } from "next/headers";
const secretKey = env.JWT_SECRET;

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(userDataSchema)
    .mutation(async ({ ctx, input }) => {
      const cookieStore = await cookies();

      const [user] = await ctx.db
        .select()
        .from(users)
        .where((it) => eq(it.login, input.login));
      if (!user) {
        throw new Error("Пользователь не найден");
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new Error("Неверный пароль");
      }
      const token = jwt.sign(user.id, secretKey);

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return {
        message: "Успешная авторизация",
        user,
      };
    }),
  signUp: publicProcedure
    .input(userDataSchema)
    .mutation(async ({ ctx, input }) => {
      const password = await bcrypt.hash(input.password, 10);

      const [user] = await ctx.db
        .insert(users)
        .values({
          ...input,
          password,
        })
        .returning();
      if (!user) {
        throw new Error("Ошибка при создании пользователя");
      }
      const token = jwt.sign({ sub: user.id }, secretKey, {
        expiresIn: 60 * 60,
      });
      const cookieOptions = {
        httpOnly: false,
        path: "/",
        secure: false,
        sameSite: "none" as const,
        maxAge: 60 * 60,
      };
      if (ctx.cookies) {
        ctx.cookies.set("token", token, cookieOptions);
      }

      console.log((await cookies()).get("token")?.value, "COOKIE");
      return {
        message: "Успешно",
        user,
        token,
      };
    }),
});
