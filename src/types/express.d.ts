import { User } from "../prisma/generated/prisma/client";

global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
