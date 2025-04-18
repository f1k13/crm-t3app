import {
  companyCreateSchema,
  getMyCompany,
  suggestDaDataCompanySchema,
} from "../../dto/company/company.dto";
import { companyService } from "../../services/company/company.service";
import { daDataService } from "../../services/da-data/da-data.service";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(companyCreateSchema)
    .mutation(
      async ({ ctx, input }) => await companyService.createCompany(ctx, input),
    ),
  suggestCompany: protectedProcedure
    .input(suggestDaDataCompanySchema)
    .query(async ({ input }) => await daDataService.suggestSearch(input)),
  getAllCompanies: protectedProcedure
    .input(getMyCompany)
    .query(
      async ({ ctx, input }) => await companyService.getCompanies(ctx, input),
    ),
});
