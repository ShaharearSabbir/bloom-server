import { NextFunction, Request, Response } from "express";
import sendRes from "../utils/sendRes";
import * as z from "zod";

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

export default validate;
