import { Router } from "express";
import tutorController from "./category.controller";
import CategoryMiddleware from "./category.middleware";

const router = Router();

router.post(
  "/",
  CategoryMiddleware.validateCreateInputs,
  tutorController.createCategory,
);

router.get("/", tutorController.getCategories);

export const categoryRoutes = router;
