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
    const company = await companyRepository.create(ctx.db, data);
    if (data.phoneNumbers && data.phoneNumbers?.length > 0 && company) {
      await companyRepository.createPhoneNumber(ctx.db, {
        companyId: company.id,
        phoneNumbers: data.phoneNumbers,
      });
    }
    if (data.emails && data.emails.length > 0 && company) {
      await companyRepository.createEmail(ctx.db, {
        companyId: company.id,
        emails: data.emails,
      });
    }
    if (data.messengers && data.messengers.length > 0 && company) {
      await companyRepository.createMessenger(ctx.db, {
        companyId: company.id,
        messengers: data.messengers,
      });
    }
    if (data.contactPersons && data.contactPersons.length > 0 && company) {
      await companyRepository.createPersons(ctx.db, {
        companyId: company.id,
        contactPersons: data.contactPersons,
      });
    }
  },
};
