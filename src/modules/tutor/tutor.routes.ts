import { Router } from "express";
import tutorController from "./tutor.controller";
import tutorMiddleware from "./tutor.middleware";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(),
  tutorMiddleware.validateCreateInputs,
  tutorController.createTutor,
);

router.put(
  "/",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorMiddleware.validateUpdateInputs,
  tutorController.updateTutor,
);

router.get(
  "/my-profile",
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.getMyTutor,
);

router.get("/", tutorController.getTutors);

export const tutorRoutes = router;
