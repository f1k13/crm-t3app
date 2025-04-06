import { userService } from "../../services/user/user.services";
import { createTRPCRouter } from "../../trpc";

export const userRouter = createTRPCRouter({
  getSelf: userService.getSelf,
});
