import { type TContext } from "../../trpc";
import {
  type TCreateUserInput,
  type TDeleteUsers,
  type TEditUserInput,
  type TGetAllUserInput,
  type TGetUserByIdInput,
  type TUserIdInput,
  type TUserResetPassword,
} from "../../dto/user/user.dto";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import jwt from "jsonwebtoken";
import { userRepository } from "../../repository/user/user.repository";

const secretKey = env.JWT_SECRET;

const create = async (ctx: TContext, input: TCreateUserInput) => {
  const password = await bcrypt.hash(input.password, 10);
  const existing = await userRepository.findByLogin(ctx.db, input.login);
  if (existing) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь уже есть в системе",
    });
  }

  const user = await userRepository.createUser(ctx.db, { ...input, password });

  const token = jwt.sign({ sub: user?.id }, secretKey, { expiresIn: "1d" });
  const link = `${env.HOST_LINK}/auth/confirm?token=${token}`;

  return {
    link,
    message: "Пользователь создан успешно",
  };
};

const getSelf = async (ctx: TContext) => {
  return userRepository.findById(ctx.db, ctx.userId);
};

const getAll = async (ctx: TContext, input: TGetAllUserInput) => {
  const { data, totalCount, filteredCount } = await userRepository.getAll(
    ctx.db,
    input,
  );
  const totalPages = Math.ceil(filteredCount / input.limit);

  return {
    data,
    totalCount,
    totalPages,
  };
};

const getUserById = async (ctx: TContext, input: TGetUserByIdInput) => {
  const user = await userRepository.findById(ctx.db, input.id);
  if (!user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь не найден",
    });
  }
  return user;
};

const editUser = async (ctx: TContext, input: TEditUserInput) => {
  await getUserById(ctx, { id: input.id });
  return userRepository.updateUser(ctx.db, input.id, input);
};

const deleteUsers = async (ctx: TContext, input: TDeleteUsers) => {
  await userRepository.deleteUsers(ctx.db, input.userIds);
  return { success: true };
};

const createLinkResetPassword = async (ctx: TContext, input: TUserIdInput) => {
  const user = await userRepository.findById(ctx.db, input.userId);

  const token = jwt.sign({ sub: user?.id }, secretKey, { expiresIn: "1d" });
  const link = `${env.HOST_LINK}/auth/reset?token=${token}`;

  return { link };
};
const resetPassword = async (ctx: TContext, input: TUserResetPassword) => {
  const decode = jwt.verify(input.token, secretKey) as {
    sub: string;
  };
  if (!decode.sub) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Ссылка не действительна",
    });
  }
  const user = await userRepository.findById(ctx.db, decode.sub);

  if (!user) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Пользователь не найден",
    });
  }
  const password = await bcrypt.hash(input.newPassword, 10);
  await userRepository.updatePassword(ctx.db, password, user.id);
  return {
    message: "Пароль успешно обновлен",
  };
};
export const userService = {
  create,
  getSelf,
  getAll,
  editUser,
  getUserById,
  deleteUsers,
  createLinkResetPassword,
  resetPassword,
};
