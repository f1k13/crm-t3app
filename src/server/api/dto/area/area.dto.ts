import { z } from "zod";

export const createAreaSchema = z.object({
  name: z.string().min(1, "name is req"),
});

export const createAreaDefaultSchema = z.array(z.string().min(1, "req"));

export type TCreateArea = z.infer<typeof createAreaSchema>;

export type TCreateDefaultArea = z.infer<typeof createAreaDefaultSchema>;
