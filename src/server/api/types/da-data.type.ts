import { z } from "zod";

export const SuggestCompanyResponseSchema = z.object({
  suggestions: z.array(
    z.object({
      value: z.string(),
      data: z.object({
        inn: z.string(),
        ogrn: z.string(),
        name: z.object({
          full_with_opf: z.string(),
          short_with_opf: z.string(),
        }),
      }),
    }),
  ),
});

export type SuggestCompanyResponse = z.infer<
  typeof SuggestCompanyResponseSchema
>;
