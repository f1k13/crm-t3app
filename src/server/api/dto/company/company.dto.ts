import { z } from "zod";
import { CompanyTypeEnum } from "../../enums/company-enum";

export const companyCreateSchema = z.object({
  name: z.string().min(1, "company name is required"),
  inn: z.number(),
  type: z
    .enum([
      CompanyTypeEnum.IE,
      CompanyTypeEnum.LB,
      CompanyTypeEnum.NP,
      CompanyTypeEnum.SC,
    ])
    .optional(),

  comment: z.string().optional(),

  phoneNumbers: z
    .array(z.string().min(1, "phone number is required"))
    .optional(),
  emails: z.array(z.string().email("invalid email")).optional(),
  messengers: z
    .array(
      z.object({
        type: z.string().min(1, "messenger type is required"),
        contact: z.string().min(1, "messenger contact is required"),
      }),
    )
    .optional(),
  contactPersons: z
    .array(
      z.object({
        fullName: z.string().min(1, "name is required"),
        phone: z.string().min(1, "phone is required"),
        email: z.string().email("invalid email"),
      }),
    )
    .optional(),
});

export const suggestDaDataCompanySchema = z.object({
  query: z.string().min(1),
});

export const phoneNumberCompanySchema = z.object({
  companyId: z.string().min(1),
  phoneNumbers: z.array(z.string().min(1)),
});

export const emailCompanySchema = z.object({
  companyId: z.string().min(1),
  phoneNumbers: z.array(z.string().min(1)),
});

export const messengerCompanySchema = z.object({
  companyId: z.string().min(1),
  messengers: z.array(
    z.object({
      type: z.string().min(1),
      contact: z.string().min(1),
    }),
  ),
});

export const contactPersonCompany = z.object({
  companyId: z.string().min(1),
  person: z.array(
    z.object({
      fullName: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().min(1),
    }),
  ),
});

export type TCreateCompanyInput = z.infer<typeof companyCreateSchema>;

export type TCreatePhoneNumberInput = z.infer<typeof phoneNumberCompanySchema>;

export type TSuggestCompanyInput = z.infer<typeof suggestDaDataCompanySchema>;
