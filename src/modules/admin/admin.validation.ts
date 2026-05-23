import z from "zod";

export const searchAndPagination = z.object({
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

export type SearchAndPagination = z.infer<typeof searchAndPagination>;
