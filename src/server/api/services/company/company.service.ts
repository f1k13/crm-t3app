import type { TCreateCompanyInput } from "../../dto/company/company.dto";
import type { TContext } from "../../trpc";
import { companyRepository } from "../../repository/company/company.repository";
import { TRPCError } from "@trpc/server";

export const companyService = {
  async createCompany(ctx: TContext, data: TCreateCompanyInput) {
    const [companyByInn, companyByName] = await Promise.all([
      data.inn
        ? companyRepository.findByInn(ctx.db, data.inn)
        : Promise.resolve(null),
      companyRepository.findByName(ctx.db, data.name),
    ]);

    if (companyByInn) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Компания с таким ИНН уже существует",
      });
    }
    if (companyByName) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Компания с таким именем уже существует",
      });
    }
  },
};
