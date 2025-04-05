import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `crm_${name}`);

export const users = createTable("user", (d) => ({
  id: d.uuid().primaryKey().defaultRandom().notNull(),
  login: d.text().unique().notNull(),
  password: d.text().notNull(),
  role: d.text().notNull().default("manager"),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));
