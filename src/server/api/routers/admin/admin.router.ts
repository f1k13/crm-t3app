import {
  deleteUsersSchema,
  editUserSchema,
  getAllUserSchema,
  userDataSchema,
  userIdSchema,
} from "../../dto/user/user.dto";
import { userService } from "../../services/user/user.services";
import { createTRPCRouter, protectedAdminProcedure } from "../../trpc";

export const adminRouter = createTRPCRouter({
  createUser: protectedAdminProcedure
    .input(userDataSchema)
    .mutation(async ({ ctx, input }) => await userService.create(ctx, input)),
  getAllUser: protectedAdminProcedure
    .input(getAllUserSchema)
    .query(async ({ ctx, input }) => await userService.getAll(ctx, input)),
  editUser: protectedAdminProcedure
    .input(editUserSchema)
    .mutation(async ({ ctx, input }) => await userService.editUser(ctx, input)),
  deleteUsers: protectedAdminProcedure
    .input(deleteUsersSchema)
    .mutation(
      async ({ ctx, input }) => await userService.deleteUsers(ctx, input),
    ),
  resetPasswordUser: protectedAdminProcedure
    .input(userIdSchema)
    .mutation(
      async ({ ctx, input }) =>
        await userService.createLinkResetPassword(ctx, input),
    ),
});
