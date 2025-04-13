import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";
import { RoleEnum } from "~/server/api/enums/role-enum";

export const createTable = pgTableCreator((name) => `crm_${name}`);
export type TUserModel = typeof userSchema.$inferSelect;

export const userSchema = createTable("user", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  login: d.text().unique().notNull(),
  password: d.text().notNull(),
  role: d.text().notNull().default(RoleEnum.KM).$type<RoleEnum>(),
  email: d.text().unique(),
  firstName: d.text(),
  middleName: d.text(),
  lastName: d.text(),
  isConfirmed: d.boolean().default(false),
  createdAt: d
    .timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
