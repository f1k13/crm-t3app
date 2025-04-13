import * as userSchema from "./schemas/user.schema";
import * as companySchema from "./schemas/company.schema";
export const schema = {
  ...userSchema,
  companySchema,
};
