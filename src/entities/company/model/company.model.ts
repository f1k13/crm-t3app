import { z } from "zod";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";

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

export const companyTypeData = {
  [CompanyTypeEnum.IE]: "ИП",
  [CompanyTypeEnum.LB]: "Организация",
  [CompanyTypeEnum.NP]: "Физ.лицо",
  [CompanyTypeEnum.SC]: "ГОС.компания",
};

export type TCreateCompany = z.infer<typeof companyCreateSchema>;

export type TCompanyFormValues = TCreateCompany;
