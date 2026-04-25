import { NextFunction, Request, Response } from "express";
import sendRes from "../utils/sendRes";
import * as z from "zod";

const validateRequest =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.safeParse(req.body);

    if (!validated.success) {
      return sendRes({
        res,
        statusCode: 400,
        success: false,
        message: "Validation failed",
        error: validated.error.issues,
      });
    }

    req.body = validated.data;
    next();
  };

export default validateRequest;
