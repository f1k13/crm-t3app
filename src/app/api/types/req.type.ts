import type { NextRequest } from "next/server";
import type { TUserModel } from "~/server/api/routers/user/user.router";

export interface IAuthReq extends NextRequest {
  user?: TUserModel;
}
