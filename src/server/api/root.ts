import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth/auth.router";
import { userRouter } from "./routers/user/user.router";
import { adminRouter } from "./routers/admin/admin.router";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
