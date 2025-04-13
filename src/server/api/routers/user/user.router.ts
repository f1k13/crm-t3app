import { userService } from "./../../services/user/user.services";
import { resetPasswordSchema } from "../../dto/user/user.dto";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

export const userRouter = createTRPCRouter({
  getSelf: protectedProcedure.query(
    async ({ ctx }) => await userService.getSelf(ctx),
  ),
  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(
      async ({ ctx, input }) => await userService.resetPassword(ctx, input),
    ),
});
