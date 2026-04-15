import z from "zod";

export const getTutorQueryZodSchema = z.object({
  category: z.string().optional(),
  sortBy: z.enum(["newest", "price_asc", "price_desc"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type TutorQueryParams = z.infer<typeof getTutorQueryZodSchema>;
