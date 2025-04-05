import { users } from "~/server/db/schemas/user.schema";
import { userDataSchema } from "../../dto/user/user.dto";
import { publicProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { cookies } from "next/headers";

const secretKey = env.JWT_SECRET;

const signIn = publicProcedure
  .input(userDataSchema)
  .mutation(async ({ ctx, input }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.login, input.login));

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new Error("Invalid password");

    // Генерируем токен с userId в sub
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Устанавливаем cookie
    ctx.cookies?.set("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    return {
      user,
      token, // Для клиентского сохранения
    };
  });

export const authService = {
  signIn,
};
