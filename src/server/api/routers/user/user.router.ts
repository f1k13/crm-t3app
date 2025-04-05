import { users } from "~/server/db/schemas/user.schema";
import { userService } from "../../services/user/user.services";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
export type TUserModel = typeof users.$inferSelect;

export const userRouter = createTRPCRouter({
  create: userService.create,
  getSelf: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where((it) => eq(it.id, ctx.userId));
    return user;
  }),
});
