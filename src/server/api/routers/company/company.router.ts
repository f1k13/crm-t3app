import { companyCreateSchema } from "../../dto/company/company.dto";
import { companyService } from "../../services/company/company.service";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(companyCreateSchema)
    .mutation(
      async ({ ctx, input }) => await companyService.createCompany(ctx, input),
    ),
});
