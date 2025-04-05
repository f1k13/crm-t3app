import { users } from "~/server/db/schemas/user.schema";
import { publicProcedure } from "../../trpc";
import { userDataSchema } from "../../dto/user/user.dto";

const create = publicProcedure
  .input(userDataSchema)
  .mutation(async ({ ctx, input }) => {
    console.log(ctx.headers, "HEADERS");
    await ctx.db.insert(users).values(input);
  });

export const userService = {
  create,
};
