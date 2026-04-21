import { BookingStatus } from "../../prisma/generated/prisma/enums";
import { z } from "zod";

export const createBookingsZodSchema = z.array(
  z.object({
    tutorId: z.string(),
    categoryId: z.string(),
    studentId: z.string(),
    bookingDate: z.string().datetime(),
    startTime: z.string(),
    endTime: z.string(),
    totalFees: z.number().positive(),
    status: z.enum(BookingStatus),
  }),
);

export type CreateBookingsData = z.infer<typeof createBookingsZodSchema>;
