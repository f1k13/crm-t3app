import { userService } from "../../services/user/user.services";
import { createTRPCRouter } from "../../trpc";

export const userRouter = createTRPCRouter({
  create: userService.create,
  getSelf: userService.getSelf,
  getAll: userService.getAll,
});
