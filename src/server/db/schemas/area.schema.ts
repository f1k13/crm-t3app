import { pgTableCreator, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `crm_${name}`);

export const areaSchema = createTable("area", (d) => ({
  id: uuid().primaryKey().defaultRandom(),
  name: d.text().notNull(),
}));
