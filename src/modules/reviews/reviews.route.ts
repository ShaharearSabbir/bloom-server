import { Router } from "express";
import { reviewsController } from "./reviews.controller";
import validateRequest from "../../middleware/validateRequest";
import { createReviewZodSchema } from "./reviews.validation";
import auth from "../../middleware/auth";

const route = Router();

route.post(
  "/",
  auth(),
  validateRequest(createReviewZodSchema),
  reviewsController.createReview,
);

export const reviewsRoute = route;
