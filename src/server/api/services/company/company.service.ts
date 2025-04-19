import type {
  TCreateCompanyInput,
  TGetMyCompanyInput,
} from "../../dto/company/company.dto";
import type { TContext } from "../../trpc";
import { companyRepository } from "../../repository/company/company.repository";
import { TRPCError } from "@trpc/server";
import { groupBy } from "../../utils/group-by";

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
  async getCompanies(ctx: TContext, input: TGetMyCompanyInput) {
    const payload = {
      ...input,
      answerId: ctx.userId,
    };

    const companies = await companyRepository.getCompanies(ctx.db, payload);

    const companyIds = companies
      .filter((it) => it.company.id !== null)
      .map((c) => c.company.id);

    const [phones, emails, messengers, contacts] = await Promise.all([
      companyRepository.getPhonesCompanyByCompanyIds(ctx.db, companyIds),
      companyRepository.getEmailsCompanyByCompanyIds(ctx.db, companyIds),
      companyRepository.getMessengersCompanyByCompanyIds(ctx.db, companyIds),
      companyRepository.getPersonsCompanyByCompanyIds(ctx.db, companyIds),
    ]);

    type TPhone = (typeof phones)[number];
    type TEmail = (typeof emails)[number];
    type TMessenger = (typeof messengers)[number];
    type TContact = (typeof contacts)[number];

    const phonesGrouped: Record<string, TPhone[]> = groupBy(
      phones.filter((p) => p.companyId),
      (p) => p.companyId,
    );
    const emailsGrouped: Record<string, TEmail[]> = groupBy(
      emails.filter((e) => e.companyId),
      (e) => e.companyId,
    );
    const messengersGrouped: Record<string, TMessenger[]> = groupBy(
      messengers.filter((m) => m.companyId),
      (m) => m.companyId,
    );
    const contactsGrouped: Record<string, TContact[]> = groupBy(
      contacts.filter((c) => c.companyId),
      (c) => c.companyId,
    );

    const fullCompanies = companies.map(({ company, area }) => {
      const companyId = company.id;

      return {
        company: {
          ...company,
          area,
        },
        phones: phonesGrouped[companyId] ?? null,
        emails: emailsGrouped[companyId] ?? null,
        messengers: messengersGrouped[companyId] ?? null,
        persons: contactsGrouped[companyId] ?? null,
      };
    });

    return {
      data: fullCompanies,
    };
  },
};
