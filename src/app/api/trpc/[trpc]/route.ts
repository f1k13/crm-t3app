import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const createContext = async (req: NextRequest) => {
  const cookieStore = await cookies();
  return createTRPCContext({
    headers: req.headers,
    cookies: cookieStore,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,

    responseMeta() {
      return {
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin") ?? "*",
          "Access-Control-Allow-Credentials": "true",
        },
      };
    },
  });

export { handler as GET, handler as POST };
