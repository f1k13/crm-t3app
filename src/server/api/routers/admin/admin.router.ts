import {
  deleteUsersSchema,
  editUserSchema,
  getAllUserSchema,
  userDataSchema,
} from "../../dto/user/user.dto";
import { userService } from "../../services/user/user.services";
import { createTRPCRouter, protectedAdminProcedure } from "../../trpc";

export const adminRouter = createTRPCRouter({
  createUser: protectedAdminProcedure
    .input(userDataSchema)
    .mutation(async ({ ctx, input }) => userService.create(ctx, input)),
  getAllUser: protectedAdminProcedure
    .input(getAllUserSchema)
    .query(async ({ ctx, input }) => userService.getAll(ctx, input)),
  editUser: protectedAdminProcedure
    .input(editUserSchema)
    .mutation(async ({ ctx, input }) => userService.editUser(ctx, input)),
  deleteUsers: protectedAdminProcedure
    .input(deleteUsersSchema)
    .mutation(async ({ ctx, input }) => userService.deleteUsers(ctx, input)),
});
