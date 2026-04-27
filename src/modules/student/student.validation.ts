import z from "zod";

export const updateStudentZodSchema = z.object({
  name: z.string(),
});

export type UpdateStudentPayload = z.infer<typeof updateStudentZodSchema>;
