import { Router } from "express";
import studentController from "./student.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentZodSchema } from "./student.validation";

const route = Router();

route.get("/my-profile", auth(UserRole.STUDENT), studentController.getProfile);

route.put(
  "/my-profile",
  auth(UserRole.STUDENT),
  validateRequest(updateStudentZodSchema),
  studentController.updateProfile,
);

const studentRoute = route;
export default studentRoute;
