import { z } from "zod";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";
import {
  TELEGRAM_CONTACT,
  VIBER_CONTACT,
  WHATS_APP_CONTACT,
} from "~/shared/constants/contacts";

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
    .array(
      z.object({
        value: z
          .string()
          .min(1, "phone number is required")
          .regex(/^(\+7|8)\d{10}$/, "Неверный формат телефона"),
      }),
    )
    .optional(),

  emails: z
    .array(
      z.object({
        value: z
          .string()
          .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Некорректный email",
          ),
      }),
    )
    .optional(),
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

export const COMPANY_TYPE = {
  [CompanyTypeEnum.IE]: "ИП",
  [CompanyTypeEnum.LB]: "Организация",
  [CompanyTypeEnum.NP]: "ФИЗ лицо",
  [CompanyTypeEnum.SC]: "ГОС компания",
};
export const companyDataType = [
  {
    key: CompanyTypeEnum.IE,
    label: "ИП",
  },
  {
    key: CompanyTypeEnum.LB,
    label: "Организация",
  },
  {
    key: CompanyTypeEnum.NP,
    label: "ФИЗ лицо",
  },
  {
    key: CompanyTypeEnum.SC,
    label: "ГОС компания",
  },
];
export type TCreateCompany = z.infer<typeof companyCreateSchema>;

export type TCompanyFormValues = TCreateCompany;
