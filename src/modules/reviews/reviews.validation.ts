import z from "zod";

export const createReviewZodSchema = z.object({
  tutorId: z.string().trim().min(1, "Tutor ID is required"),
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string().trim().min(1, "Comment is required"),
});

export type ICreateReview = z.infer<typeof createReviewZodSchema>;
