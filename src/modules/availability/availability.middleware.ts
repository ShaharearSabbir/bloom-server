import { z } from "zod";
import validate from "../../middleware/validate";

export const availabilityBaseSchema = z
  .object({
    tutorId: z.string().trim().min(1, "Tutor ID is required"),
    dayOfWeek: z
      .number()
      .int()
      .min(0, "Day must be between 0 (Sun) and 6 (Sat)")
      .max(6, "Day must be between 0 (Sun) and 6 (Sat)"),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  })
  .refine(
    (data) => {
      const start = parseInt(data.startTime.replace(":", ""), 10);
      const end = parseInt(data.endTime.replace(":", ""), 10);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );

export const availabilityArraySchema = z
  .array(availabilityBaseSchema)
  .min(1, "At least one availability slot is required");

const availabilityMiddleware = {
  validateBulkSlots: validate(availabilityArraySchema),
  validateSingleSlot: validate(availabilityBaseSchema),
};

export default availabilityMiddleware;
