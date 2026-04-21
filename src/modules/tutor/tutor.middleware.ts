import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import validateRequest from "../../middleware/validateRequest";

const tutorBaseSchema = z.object({
  categoryId: z.string().trim().min(1, "Category ID is required"),
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.number().positive("Rate must be a positive number"),
  profession: z.string().trim().min(1, "Profession is required"),
});

export const tutorCreateValidInputs = tutorBaseSchema;

export const tutorUpdateValidInputs = tutorBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for an update",
  });

const tutorMiddleware = {
  validateCreateInputs: validateRequest(tutorCreateValidInputs),
  validateUpdateInputs: validateRequest(tutorUpdateValidInputs),
};

export default tutorMiddleware;
