import { Router } from "express";
import availabilityController from "./availability.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";

const routes = Router();

routes.post(
  "/",
  auth(UserRole.TUTOR),
  availabilityController.createTutorAvailabilities,
);

routes.get(
  "/",
  auth(UserRole.TUTOR),
  availabilityController.getTutorAvailabilities,
);

const availabilityRoutes = routes;
export default availabilityRoutes;
