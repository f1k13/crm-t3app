import {
  companySchema,
  contactPersonSchema,
  emailSchema,
  messengerSchema,
  phoneNumberSchema,
} from "~/server/db/schemas/company.schema";
import {
  type TContactPersonCreate,
  type TCreateCompanyInput,
  type TCreateEmailInput,
  type TCreatePhoneNumberInput,
  type TGetMyCompanyInput,
  type TMessengerCreate,
} from "../../dto/company/company.dto";
import type { TDrizzleDatabase } from "../repository";
import { eq, ilike, inArray, or, and, desc } from "drizzle-orm";
import { areaSchema } from "~/server/db/schemas/area.schema";

export const companyRepository = {
  async create(db: TDrizzleDatabase, dto: TCreateCompanyInput) {
    const companyPayload = {
      inn: dto.inn,
      name: dto.name,
      type: dto.type,
      comment: dto.comment,
      areaId: dto.areaId,
      answerId: dto.answerId,
    };

    const [company] = await db
      .insert(companySchema)
      .values(companyPayload)
      .returning();

    return company;
  },
  async findByInn(db: TDrizzleDatabase, inn: string) {
    const [company] = await db
      .select()
      .from(companySchema)
      .where((it) => eq(it.inn, inn));
    return company;
  },
  async findByName(db: TDrizzleDatabase, name: string) {
    const [company] = await db
      .select()
      .from(companySchema)
      .where((it) => eq(it.name, name));
    return company;
  },
  async createPhoneNumber(db: TDrizzleDatabase, dto: TCreatePhoneNumberInput) {
    const { companyId, phoneNumbers } = dto;
    const dataInsert = phoneNumbers.map((it) => ({
      companyId,
      phoneNumber: it,
    }));
    const data = await db.insert(phoneNumberSchema).values(dataInsert);

    return {
      data,
    };
  },
  async createEmail(db: TDrizzleDatabase, dto: TCreateEmailInput) {
    const { companyId, emails } = dto;
    const dataInsert = emails.map((it) => ({
      companyId,
      email: it,
    }));
    const data = await db.insert(emailSchema).values(dataInsert);
    return {
      data,
    };
  },
  async createMessenger(db: TDrizzleDatabase, dto: TMessengerCreate) {
    const { companyId, messengers } = dto;
    const dataInsert = messengers.map((it) => ({
      companyId,
      type: it.type,
      contact: it.contact,
    }));
    const data = await db.insert(messengerSchema).values(dataInsert);
    return {
      data,
    };
  },
  async createPersons(db: TDrizzleDatabase, dto: TContactPersonCreate) {
    const { companyId, contactPersons } = dto;
    const dataInsert = contactPersons.map((it) => ({
      companyId,
      fullName: it.fullName,
      email: it.email,
      phone: it.phone,
    }));
    const data = await db.insert(contactPersonSchema).values(dataInsert);
    return {
      data,
    };
  },
  async getCompanies(
    db: TDrizzleDatabase,
    dto: TGetMyCompanyInput & { answerId: string },
  ) {
    const { query, areaIds, answerId, typesCompany, page, limit } = dto;
    const offset = (page - 1) * limit;
    const conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(companySchema.name, `%${query}%`),
          ilike(companySchema.inn, `%${query}%`),
        ),
      );
    }

    if (areaIds && areaIds.length > 0) {
      conditions.push(inArray(companySchema.areaId, areaIds));
    }
    if (typesCompany && typesCompany.length > 0) {
      conditions.push(inArray(companySchema.type, typesCompany));
    }
    conditions.push(eq(companySchema.answerId, answerId));
    const data = await db
      .select({
        company: companySchema,
        area: {
          name: areaSchema.name,
        },
      })
      .from(companySchema)
      .leftJoin(areaSchema, eq(companySchema.areaId, areaSchema.id))
      .where(and(...conditions))
      .orderBy(desc(companySchema.createdAt))
      .limit(limit)
      .offset(offset);

    return data;
  },
  async getPhonesCompanyByCompanyIds(db: TDrizzleDatabase, ids: string[]) {
    return await db
      .select()
      .from(phoneNumberSchema)
      .where(inArray(phoneNumberSchema.companyId, ids));
  },
  async getEmailsCompanyByCompanyIds(db: TDrizzleDatabase, ids: string[]) {
    return await db
      .select()
      .from(emailSchema)
      .where(inArray(emailSchema.companyId, ids));
  },
  async getMessengersCompanyByCompanyIds(db: TDrizzleDatabase, ids: string[]) {
    return await db
      .select()
      .from(messengerSchema)
      .where(inArray(messengerSchema.companyId, ids));
  },
  async getPersonsCompanyByCompanyIds(db: TDrizzleDatabase, ids: string[]) {
    return await db
      .select()
      .from(contactPersonSchema)
      .where(inArray(contactPersonSchema.companyId, ids));
  },
};
