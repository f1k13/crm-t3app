import { createTRPCRouter, publicProcedure } from "../../trpc";
import { authService } from "../../services/auth/auth.services";
import { authDataSchema, verifyUserSchema } from "../../dto/user/user.dto";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(authDataSchema)
    .mutation(async ({ ctx, input }) => authService.signIn(ctx, input)),
  verify: publicProcedure
    .input(verifyUserSchema)
    .mutation(async ({ ctx, input }) => authService.authVerify(ctx, input)),
});
