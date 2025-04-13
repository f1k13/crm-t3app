import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    JWT_SECRET: z.string().min(1, "JWT SECRET IS REQ"),
    HOST_LINK: z.string().min(1, "HOST_LINK IS REQ"),
    DA_DATA_TOKEN: z.string().min(1, "DA_DATA_TOKEN IS REQ"),
    DA_DATA_LINK: z.string().min(1, "DA_DATA_lINK IS REQ"),
  },

  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    HOST_LINK: process.env.HOST_LINK,
    DA_DATA_TOKEN: process.env.DA_DATA_TOKEN,
    DA_DATA_LINK: process.env.DA_DATA_LINK,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
