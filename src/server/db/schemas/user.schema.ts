import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";
import { RoleEnum } from "~/server/api/enums/role-enum";

export const createTable = pgTableCreator((name) => `crm_${name}`);
export type TUserModel = typeof users.$inferSelect;

export const users = createTable("user", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  login: d.text().unique().notNull(),
  password: d.text().notNull(),
  role: d.text().notNull().default(RoleEnum.MANAGER).$type<RoleEnum>(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
