import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import sendRes from "../../utils/sendRes";

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

const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.safeParse(req.body);

    if (!validated.success) {
      return sendRes(
        res,
        400,
        false,
        "Validation Error",
        null,
        validated.error.format(),
      );
    }

    req.body = validated.data;
    next();
  };

const CategoryMiddleware = {
  validateCreateInputs: validate(CategoryCreateValidInputs),
  validateUpdateInputs: validate(CategoryUpdateValidInputs),
};

export default CategoryMiddleware;
