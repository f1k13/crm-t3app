import { z } from "zod";

export const createAreaSchema = z.object({
  name: z.string().min(1, "area is req"),
});

export const areaSchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type TArea = z.infer<typeof areaSchema>;

export type TCreateArea = z.infer<typeof createAreaSchema>;
