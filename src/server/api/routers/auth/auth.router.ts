import { createTRPCRouter } from "../../trpc";
import { authService } from "../../services/auth/auth.services";

export const authRouter = createTRPCRouter({
  signIn: authService.signIn,
});
