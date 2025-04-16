import { createAreaSchema } from "../../dto/area/area.dto";
import { areaService } from "../../services/area/area.service";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
} from "../../trpc";

export const areaRouter = createTRPCRouter({
  areaInsert: protectedAdminProcedure.mutation(
    async ({ ctx }) => await areaService.createMulti(ctx),
  ),
  areaCreate: protectedAdminProcedure
    .input(createAreaSchema)
    .mutation(async ({ ctx, input }) => await areaService.create(ctx, input)),
  getAreas: protectedProcedure.query(
    async ({ ctx }) => await areaService.getAreas(ctx),
  ),
});
