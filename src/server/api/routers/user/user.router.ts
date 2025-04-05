import type { users } from "~/server/db/schemas/user.schema";
import { userService } from "../../services/user/user.services";
import { createTRPCRouter } from "../../trpc";
export type TUserModel = typeof users.$inferSelect;

export const userRouter = createTRPCRouter({
  create: userService.create,
  getSelf: userService.getSelf,
});
