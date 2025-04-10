import type { IUser } from "../model/user.model";

export const userAdapter = (users: IUser[]): (IUser & { key: string })[] => {
  return users.map((it, index) => ({
    ...it,
    key: String(index + 1),
  }));
};
