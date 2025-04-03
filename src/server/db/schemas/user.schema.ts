import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `crm_${name}`);

export const users = createTable("user", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  login: d.text().unique(),
  password: d.text(),
  role: d.text(),
}));
