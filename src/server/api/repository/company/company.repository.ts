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
  type TMessengerCreate,
} from "../../dto/company/company.dto";
import type { TDrizzleDatabase } from "../repository";
import { eq } from "drizzle-orm";

export const companyRepository = {
  async create(db: TDrizzleDatabase, dto: TCreateCompanyInput) {
    const companyPayload = {
      inn: dto.inn,
      name: dto.name,
      type: dto.type,
      comment: dto.comment,
      areaId: dto.areaId,
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
};
