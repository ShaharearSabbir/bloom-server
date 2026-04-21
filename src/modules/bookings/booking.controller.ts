import { NextFunction, Request, Response } from "express";
import sendRes from "../../utils/sendRes";
import { bookingService } from "./booking.service";
import { BookingStatus, UserRole } from "../../prisma/generated/prisma/enums";

const createBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;

    const result = await bookingService.createBookings(payload);
    sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Bookings created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const userBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const result = await bookingService.userBookings(
      userId as string,
      role as UserRole,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 10,
    );

    sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Bookings fetched successfully",
      data: result.bookings,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const result = await bookingService.updateBookingStatus(
      bookingId as string,
      status as BookingStatus,
    );
    sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Booking status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingController = {
  createBookings,
  userBookings,
  updateBookingStatus,
};
