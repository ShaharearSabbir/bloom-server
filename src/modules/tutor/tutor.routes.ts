import { Router } from "express";
import tutorController from "./tutor.controller";
import tutorMiddleware from "./tutor.middleware";

const router = Router();

router.post(
  "/api/tutors",
  tutorMiddleware.validateCreateInputs,
  tutorController.createTutor,
);

export const tutorRoutes = router;
