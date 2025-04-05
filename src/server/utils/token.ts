import jwt from "jsonwebtoken";
import { env } from "~/env";

export const signToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET);
