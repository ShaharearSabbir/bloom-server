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
  checkHit,
  bookingController.createBookings,
);

route.get("/my-bookings", auth(), checkHit, bookingController.userBookings);

route.patch("/:id/status", auth(), bookingController.updateBookingStatus);

export const bookingRoute = route;
