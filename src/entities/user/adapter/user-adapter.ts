import type { IUser } from "../model/user.model";

export const userAdapter = (users: IUser[]) => {
  return users.map((it, index) => ({
    ...it,
    key: String(index + 1),
  }));
};
