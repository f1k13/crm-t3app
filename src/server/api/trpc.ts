import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { env } from "~/env";
import type { NextRequest } from "next/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { users } from "../db/schemas/user.schema";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { RoleEnum } from "./enums/role-enum";

export const createTRPCContext = async (opts: {
  headers: Headers | CreateWSSContextFnOptions;
  cookies?: ReadonlyRequestCookies;
  req?: NextRequest;
}) => {
  return {
    db,
    cookies: opts.cookies,
    req: opts.req,
    userId: "",
    role: "",
    headers: opts.headers,
  };
};

export type TContext = Awaited<ReturnType<typeof createTRPCContext>>;

interface IAuthContext extends TContext {
  userId: string;
  role: RoleEnum;
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});
const authMiddleware = t.middleware<IAuthContext>(async ({ ctx, next }) => {
  try {
    let token = ctx.cookies?.get("token")?.value;

    if (!token && ctx.req) {
      const authHeader = ctx.req.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Требуется авторизация",
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string };

    if (!decoded?.sub) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Неверный токен",
      });
    }

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, decoded.sub));

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Пользователь не найден",
      });
    }

    return await next({
      ctx: {
        ...ctx,
        userId: decoded.sub,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Authentication error:", err);

    if (err instanceof TRPCError) {
      throw err;
    }

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Ошибка авторизации",
      cause: err,
    });
  }
});

const adminMiddleware = t.middleware<IAuthContext>(async ({ ctx, next }) => {
  const role = ctx.role as RoleEnum;

  if (role !== RoleEnum.ADMIN) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Недостаточно прав для выполнения данной операции",
    });
  }

  return await next();
});

export const protectedProcedure = t.procedure.use(authMiddleware);

export const protectedAdminProcedure = t.procedure
  .use(authMiddleware)
  .use(adminMiddleware);

export const publicProcedure = t.procedure.use(timingMiddleware);
