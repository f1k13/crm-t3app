import {
  companySchema,
  phoneNumberSchema,
} from "~/server/db/schemas/company.schema";
import type {
  TCreateCompanyInput,
  TCreatePhoneNumberInput,
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
    };

    const [company] = await db
      .insert(companySchema)
      .values(companyPayload)
      .returning();

    return company;
  },
  async findByInn(db: TDrizzleDatabase, inn: number) {
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
};
