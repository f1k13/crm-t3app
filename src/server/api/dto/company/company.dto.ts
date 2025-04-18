import { z } from "zod";
import { CompanyTypeEnum } from "../../enums/company-enum";

export const companyCreateSchema = z.object({
  name: z.string().min(1, "company name is required"),
  inn: z.string(),
  type: z
    .enum([
      CompanyTypeEnum.IE,
      CompanyTypeEnum.LB,
      CompanyTypeEnum.NP,
      CompanyTypeEnum.SC,
    ])
    .optional(),
  areaId: z.string().optional(),
  comment: z.string().optional(),
  answerId: z.string().min(1, "answerId is required"),
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
  emails: z.array(z.string().min(1)),
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
  contactPersons: z.array(
    z.object({
      fullName: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().min(1),
    }),
  ),
});

export const getCompanies = z.object({
  query: z.string().optional(),
  areaIds: z.array(z.string().min(1, "areaIds is req")).optional(),
  typesCompany: z
    .array(
      z.enum([
        CompanyTypeEnum.IE,
        CompanyTypeEnum.LB,
        CompanyTypeEnum.NP,
        CompanyTypeEnum.SC,
      ]),
    )
    .optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
});

export const getMyCompany = getCompanies.extend({});

export type TCreateCompanyInput = z.infer<typeof companyCreateSchema>;

export type TCreatePhoneNumberInput = z.infer<typeof phoneNumberCompanySchema>;

export type TCreateEmailInput = z.infer<typeof emailCompanySchema>;

export type TMessengerCreate = z.infer<typeof messengerCompanySchema>;

export type TContactPersonCreate = z.infer<typeof contactPersonCompany>;

export type TSuggestCompanyInput = z.infer<typeof suggestDaDataCompanySchema>;

export type TGetMyCompanyInput = z.infer<typeof getMyCompany>;
