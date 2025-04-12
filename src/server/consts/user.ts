import { users } from "../db/schemas/user.schema";

export const SORTABLE_FIELDS = {
  firstName: users.firstName,
  createdAt: users.createdAt,
  role: users.role,
} as const;

export type TSortField = keyof typeof SORTABLE_FIELDS;

export type TSort = {
  field: TSortField;
  order: "asc" | "desc";
};
