import { users } from "~/server/db/schemas/user.schema";
import { type TContext } from "../../trpc";
import {
  type confirmUserSchema,
  type getUserByLoginSchema,
  type verifyUserSchema,
  type editUserSchema,
  type getAllUserSchema,
  type getUserByIdSchema,
  type userDataSchema,
} from "../../dto/user/user.dto";
import { asc, count, desc, eq, ilike, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";
import { env } from "~/env";
import jwt from "jsonwebtoken";
import { SORTABLE_FIELDS, type TSortField } from "~/server/consts/user";

type TCreateUserInput = z.infer<typeof userDataSchema>;

type TGetAllUserInput = z.infer<typeof getAllUserSchema>;

type TGetUserByIdInput = z.infer<typeof getUserByIdSchema>;

type TEditUser = z.infer<typeof editUserSchema>;

type TConfirmUserInput = z.infer<typeof confirmUserSchema>;

type TGetUserByLoginInput = z.infer<typeof getUserByLoginSchema>;

type TVerifyUser = z.infer<typeof verifyUserSchema>;

const secretKey = env.JWT_SECRET;

const create = async (ctx: TContext, input: TCreateUserInput) => {
  const password = await bcrypt.hash(input.password, 10);

  const find = await getUserByLogin(ctx, { login: input.login });
  if (find) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь уже есть в системе",
    });
  }
  const [user] = await ctx.db
    .insert(users)
    .values({
      ...input,
      password,
    })
    .returning();
  const token = jwt.sign({ sub: user?.id }, secretKey, {
    expiresIn: "1d",
  });
  const link = `${env.HOST_LINK}/auth/confirm?token=${token}`;
  return {
    link,
    message: "Пользователь создан успешно",
  };
};

const getUserByLogin = async (ctx: TContext, input: TGetUserByLoginInput) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where((it) => eq(it.login, input.login));
  return user;
};

const getSelf = async (ctx: TContext) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where((it) => eq(it.id, ctx.userId));
  return user;
};
const getAll = async (ctx: TContext, input: TGetAllUserInput) => {
  const { page, limit, filter, sort } = input;
  console.log(input);
  const offset = (page - 1) * limit;

  const whereClause = filter?.query
    ? or(
        ilike(users.email, `%${filter.query}%`),
        ilike(users.firstName, `%${filter.query}%`),
      )
    : undefined;

  const orderClause = sort
    ? sort.order === "asc"
      ? asc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
      : desc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
    : undefined;

  const all = await ctx.db
    .select()
    .from(users)
    .where(whereClause)
    .orderBy(orderClause!)
    .limit(limit)
    .offset(offset);

  const countResult = await ctx.db.select({ count: count() }).from(users);
  const totalCount = Number(countResult?.[0]?.count ?? 0);

  return { data: all, totalCount };
};

const getUserById = async (ctx: TContext, input: TGetUserByIdInput) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where((it) => eq(it.id, input.id));
  if (!user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь не найден",
    });
  }
  return user;
};

const editUser = async (ctx: TContext, input: TEditUser) => {
  const user = await getUserById(ctx, { id: input.id });
  const [updatedUser] = await ctx.db
    .update(users)
    .set({
      email: input.email,
      role: input.role,
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
    })
    .where(eq(users.id, user.id))
    .returning();

  return updatedUser;
};

const authVerify = async (ctx: TContext, input: TVerifyUser) => {
  const { token } = input;

  const decode = jwt.verify(token, secretKey) as { sub: string };

  if (!decode.sub) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Время истекло",
    });
  }
  const user = await getUserById(ctx, { id: decode.sub });

  if (!user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь не был создан",
    });
  }
  await setConfirm(ctx, { id: user.id, confirm: true });

  return {
    message: "Успешная верификация",
  };
};

const setConfirm = async (ctx: TContext, input: TConfirmUserInput) => {
  await ctx.db
    .update(users)
    .set({
      isConfirmed: input.confirm,
    })
    .where(eq(users.id, input.id));
};

export const userService = {
  create,
  getSelf,
  getAll,
  editUser,
  getUserById,
  setConfirm,
  authVerify,
};
