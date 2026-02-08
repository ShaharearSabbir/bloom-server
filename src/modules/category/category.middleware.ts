import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import validate from "../../middleware/validate";

const CategoryBaseSchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  slug: z.string().trim().min(1, "Category slug is required"),
});

export const CategoryCreateValidInputs = CategoryBaseSchema;

export const CategoryUpdateValidInputs = CategoryBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for an update",
  },
);

const CategoryMiddleware = {
  validateCreateInputs: validate(CategoryCreateValidInputs),
  validateUpdateInputs: validate(CategoryUpdateValidInputs),
};

export default CategoryMiddleware;
