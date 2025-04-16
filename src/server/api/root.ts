import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth/auth.router";
import { userRouter } from "./routers/user/user.router";
import { adminRouter } from "./routers/admin/admin.router";
import { companyRouter } from "./routers/company/company.router";
import { areaRouter } from "./routers/area/area.router";
// import { callRouter } from "./routers/call/call.router";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  admin: adminRouter,
  company: companyRouter,
  area: areaRouter,
  // call: callRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
