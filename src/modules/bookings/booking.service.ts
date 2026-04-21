import prisma from "../../lib/prisma";
import { BookingStatus, UserRole } from "../../prisma/generated/prisma/enums";
import { CreateBookingsData } from "./booking.validation";

const createBookings = async (payload: CreateBookingsData) => {
  console.log(payload);

  const bookings = await prisma.booking.createMany({ data: payload });
  return bookings;
};

const userBookings = async (
  userId: string,
  role: UserRole,
  page: number = 1,
  limit: number = 10,
) => {
  const bookingsData = await prisma.$transaction(async (tx) => {
    const bookings = await tx.booking.findMany({
      where: { [role === UserRole.TUTOR ? "tutorId" : "studentId"]: userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await tx.booking.count({
      where: { [role === UserRole.TUTOR ? "tutorId" : "studentId"]: userId },
    });
    return { bookings, total };
  });
  return {
    bookings: bookingsData.bookings,
    meta: {
      page,
      limit,
      total: bookingsData.total,
      totalPages: Math.ceil(bookingsData.total / limit),
    },
  };
};

const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
) => {
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: status },
  });
  return updatedBooking;
};

export const bookingService = {
  createBookings,
  userBookings,
  updateBookingStatus,
};
