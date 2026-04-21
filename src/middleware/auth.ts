import { NextFunction, Request, Response } from "express";
import { UserRole } from "../prisma/generated/prisma/enums";
import { auth as betterAuth } from "../lib/auth";
import sendRes from "../utils/sendRes";
import { User } from "../prisma/generated/prisma/client";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as HeadersInit,
      });

      if (!session) {
        return sendRes({
          res,
          statusCode: 401,
          success: false,
          message: "authentication required",
        });
      }

      if (!session?.user.emailVerified) {
        return sendRes({
          res,
          statusCode: 403,
          success: false,
          message: "email verification required",
        });
      }

      if (session?.user.status !== "ACTIVE") {
        return sendRes({
          res,
          statusCode: 403,
          success: false,
          message: "account activation required",
        });
      }

      const currentUserRole = session?.user.role as UserRole;

      if (roles && roles.length > 0 && !roles.includes(currentUserRole)) {
        return sendRes({
          res,
          statusCode: 401,
          success: false,
          message: "unauthorized access",
        });
      }

      req.user = session?.user as User;

      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
