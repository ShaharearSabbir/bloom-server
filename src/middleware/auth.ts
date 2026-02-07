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
        return sendRes(res, 401, false, "unauthorized access");
      }

      if (!session?.user.emailVerified) {
        return sendRes(res, 403, false, "email verified required");
      }

      if (session?.user.status !== "ACTIVE") {
        return sendRes(res, 403, false, "account activation required");
      }

      const currentUserRole = session?.user.role as UserRole;

      if (roles && roles.length > 0 && !roles.includes(currentUserRole)) {
        return sendRes(res, 401, false, "unauthorized access");
      }

      req.user = session?.user as User;

      return next();
    } catch (error) {
      next(error);
    }
  };
};
