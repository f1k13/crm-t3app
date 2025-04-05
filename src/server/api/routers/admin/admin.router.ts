import { userService } from "../../services/user/user.services";
import { createTRPCRouter } from "../../trpc";

export const adminRouter = createTRPCRouter({
  createUser: userService.create,
});
