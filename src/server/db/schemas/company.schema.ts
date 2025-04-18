import { pgTableCreator } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";
import { areaSchema } from "./area.schema";
import { userSchema } from "./user.schema";
import { sql } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `crm_${name}`);
export type TCompanyModel = typeof companySchema.$inferSelect;

export const companySchema = createTable("company", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  inn: d.text().unique(),
  name: d.text().unique().notNull(),
  type: d.text().default(CompanyTypeEnum.LB).$type<CompanyTypeEnum>(),
  comment: d.text(),
  areaId: d.uuid().references(() => areaSchema.id),
  answerId: d.uuid().references(() => userSchema.id),
  createdAt: d
    .timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const phoneNumberSchema = createTable("company_phone_number", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d
    .uuid()
    .references(() => companySchema.id)
    .notNull(),
  phoneNumber: d.text().notNull().unique(),
  createdAt: d
    .timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const emailSchema = createTable("company_email", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d
    .uuid()
    .references(() => companySchema.id)
    .notNull(),
  email: d.text().notNull().unique(),
  createdAt: d
    .timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const messengerSchema = createTable("company_messenger", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d
    .uuid()
    .references(() => companySchema.id)
    .notNull(),
  type: d.text().notNull(),
  contact: d.text().notNull(),
  createdAt: d
    .timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const contactPersonSchema = createTable(
  "company_contact_person",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    companyId: d
      .uuid()
      .references(() => companySchema.id)
      .notNull(),
    fullName: d.text().notNull(),
    phone: d.text().notNull(),
    email: d.text().notNull(),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
);

export const companyRelations = relations(companySchema, ({ many }) => ({
  phoneNumbers: many(phoneNumberSchema),
  emails: many(emailSchema),
  messengers: many(messengerSchema),
  contactPersons: many(contactPersonSchema),
}));

export const phoneNumberRelations = relations(phoneNumberSchema, ({ one }) => ({
  company: one(companySchema, {
    fields: [phoneNumberSchema.companyId],
    references: [companySchema.id],
  }),
}));

export const messengerRelations = relations(messengerSchema, ({ one }) => ({
  company: one(companySchema, {
    fields: [messengerSchema.companyId],
    references: [companySchema.id],
  }),
}));

export const contactPersonRelations = relations(
  contactPersonSchema,
  ({ one }) => ({
    company: one(companySchema, {
      fields: [contactPersonSchema.companyId],
      references: [companySchema.id],
    }),
  }),
);

export const emailRelations = relations(emailSchema, ({ one }) => ({
  company: one(companySchema, {
    fields: [emailSchema.companyId],
    references: [companySchema.id],
  }),
}));
