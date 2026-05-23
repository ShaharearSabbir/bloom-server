import { Router } from "express";
import adminController from "./admin.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../prisma/generated/prisma/enums";
import checkHit from "../../middleware/checkHit";

const route = Router();

route.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);

route.get("/bookings", auth(UserRole.ADMIN), adminController.getAllBookings);

route.put(
  "/users/:id/status",
  auth(UserRole.ADMIN),
  adminController.updateUserStatus,
);

const AdminRoute = route;

export default AdminRoute;
