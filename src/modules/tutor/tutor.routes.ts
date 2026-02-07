import { Router } from "express";
import tutorController from "./tutor.controller";
import tutorMiddleware from "./tutor.middleware";

const router = Router();

router.post(
  "/",
  tutorMiddleware.validateCreateInputs,
  tutorController.createTutor,
);

router.get("/my-profile", tutorController.getMyTutor);

export const tutorRoutes = router;
