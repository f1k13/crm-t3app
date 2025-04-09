import { verifyUserSchema } from "../../dto/user/user.dto";
import { userService } from "../../services/user/user.services";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

export const userRouter = createTRPCRouter({
  getSelf: protectedProcedure.query(async ({ ctx }) =>
    userService.getSelf(ctx),
  ),
  verify: publicProcedure
    .input(verifyUserSchema)
    .mutation(async ({ ctx, input }) => userService.authVerify(ctx, input)),
});
