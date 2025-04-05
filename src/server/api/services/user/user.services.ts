import { users } from "~/server/db/schemas/user.schema";
import { protectedAdminProcedure, protectedProcedure } from "../../trpc";
import { userDataSchema } from "../../dto/user/user.dto";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
const create = protectedAdminProcedure
  .input(userDataSchema)
  .mutation(async ({ ctx, input }) => {
    const password = await bcrypt.hash(input.password, 10);
    await ctx.db.insert(users).values({
      ...input,
      password,
    });
  });

const getSelf = protectedProcedure.query(async ({ ctx }) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where((it) => eq(it.id, ctx.userId));
  return user;
});

export const userService = {
  create,
  getSelf,
};
