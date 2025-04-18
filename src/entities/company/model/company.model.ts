import { z } from "zod";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";

export const companyCreateSchema = z.object({
  name: z.string().min(1, "Наименование компании обязательно"),
  inn: z.string(),
  type: z
    .enum([
      CompanyTypeEnum.IE,
      CompanyTypeEnum.LB,
      CompanyTypeEnum.NP,
      CompanyTypeEnum.SC,
    ])
    .optional(),
  answerId: z.string().min(1),
  comment: z.string().optional(),
  areaId: z.string().optional(),
  phoneNumbers: z
    .array(
      z.object({
        value: z
          .string()
          .transform((val) => val.replace(/[^\d+]/g, ""))
          .refine(
            (val) => /^(\+7|8)\d{10}$/.test(val),
            "Неверный формат телефона",
          ),
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
        type: z.string().min(1, "Выберите тип мессенджера"),
        contact: z.string().min(1, "Поле контакт обязательно"),
      }),
    )
    .optional(),
  contactPersons: z
    .array(
      z.object({
        fullName: z.string().min(1, "Поле ФИО обязательно"),
        phone: z
          .string()
          .transform((val) => val.replace(/[^\d+]/g, ""))
          .refine(
            (val) => /^(\+7|8)\d{10}$/.test(val),
            "Неверный формат телефона",
          ),
        email: z
          .string()
          .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Некорректный email",
          ),
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

export const companyDataSchema = z.object({
  company: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    inn: z.string().nullable(),
    type: z.nativeEnum(CompanyTypeEnum).nullable(),
    comment: z.string().nullable(),
    areaId: z.string().nullable(),
    answerId: z.string().nullable(),
    createdAt: z.date(),
  }),

  phones: z
    .array(
      z.object({
        phoneNumber: z.string(),
        companyId: z.string(),
        createdAt: z.date(),
        id: z.string().min(1),
      }),
    )
    .nullable(),

  emails: z
    .array(
      z.object({
        email: z.string(),
        companyId: z.string(),
        createdAt: z.date(),
        id: z.string().min(1),
      }),
    )
    .nullable(),

  messengers: z
    .array(
      z.object({
        type: z.string(),
        contact: z.string(),
        companyId: z.string(),
        createdAt: z.date(),
        id: z.string().min(1),
      }),
    )
    .nullable(),

  contacts: z
    .array(
      z.object({
        fullName: z.string(),
        phone: z.string(),
        email: z.string(),
        companyId: z.string(),
        createdAt: z.date(),
        id: z.string().min(1),
      }),
    )
    .nullable(),
});

export type TCompanyData = z.infer<typeof companyDataSchema>;

export type TCreateCompany = z.infer<typeof companyCreateSchema>;

export type TCompanyFormValues = TCreateCompany;
