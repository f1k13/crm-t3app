import { pgTableCreator } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";

export const createTable = pgTableCreator((name) => `crm_${name}`);
export type TCompanyModel = typeof companySchema.$inferSelect;

export const companySchema = createTable("company", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  inn: d.integer().unique(),
  name: d.text().unique().notNull(),
  type: d.text().default(CompanyTypeEnum.LB).$type<CompanyTypeEnum>(),
  comment: d.text(),
}));

export const phoneNumberSchema = createTable("company_phone_number", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d.uuid().references(() => companySchema.id),
  phoneNumber: d.text().notNull().unique(),
}));
export const emailSchema = createTable("company_email", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d.uuid().references(() => companySchema.id),
  email: d.text().notNull().unique(),
}));
export const messengerSchema = createTable("company_messenger", (d) => ({
  id: d.uuid().primaryKey().defaultRandom(),
  companyId: d.uuid().references(() => companySchema.id),
  type: d.text().notNull(),
  contact: d.text().notNull(),
}));
export const contactPersonSchema = createTable(
  "company_contact_person",
  (d) => ({
    id: d.uuid().primaryKey().defaultRandom(),
    companyId: d.uuid().references(() => companySchema.id),
    fullName: d.text().notNull(),
    phone: d.text().notNull(),
    email: d.text().notNull(),
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
