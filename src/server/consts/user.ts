import { userSchema } from "../db/schemas/user.schema";

export const SORTABLE_FIELDS = {
  firstName: userSchema.firstName,
  createdAt: userSchema.createdAt,
  role: userSchema.role,
} as const;

export type TSortField = keyof typeof SORTABLE_FIELDS;

export type TSort = {
  field: TSortField;
  order: "asc" | "desc";
};
