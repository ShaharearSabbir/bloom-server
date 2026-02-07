import { Router } from "express";
import tutorController from "./category.controller";
import CategoryMiddleware from "./category.middleware";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  CategoryMiddleware.validateCreateInputs,
  tutorController.createCategory,
);

router.get("/", tutorController.getCategories);

export const categoryRoutes = router;
