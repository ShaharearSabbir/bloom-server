import { Router } from "express";
import { reviewsController } from "./reviews.controller";
import validateRequest from "../../middleware/validateRequest";
import { createReviewZodSchema } from "./reviews.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";

const route = Router();

route.post(
  "/",
  auth(),
  validateRequest(createReviewZodSchema),
  reviewsController.createReview,
);

route.get(
  "/my-tutor-reviews",
  auth(UserRole.TUTOR),
  reviewsController.myTutorReview,
);

export const reviewsRoute = route;
