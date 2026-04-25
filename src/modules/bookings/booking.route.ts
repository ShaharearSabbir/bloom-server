import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createBookingsZodSchema } from "./booking.validation";
import checkHit from "../../middleware/checkHit";

const route = Router();

route.post(
  "/",
  auth(),
  validateRequest(createBookingsZodSchema),
  bookingController.createBookings,
);

route.get("/my-bookings", auth(), bookingController.userBookings);

route.patch("/:id/status", auth(), bookingController.updateBookingStatus);
route.post("/:id/join-session", auth(), bookingController.joinSession);

export const bookingRoute = route;
