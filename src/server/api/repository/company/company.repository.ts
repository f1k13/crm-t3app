import { companySchema } from "~/server/db/schemas/company.schema";
import type { TCreateCompanyInput } from "../../dto/company/company.dto";
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
};
