import prisma from "../../lib/prisma";
import { BookingStatus, UserRole } from "../../prisma/generated/prisma/enums";
import { CreateBookingsData } from "./booking.validation";

const createBookings = async (payload: CreateBookingsData) => {
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
    const bookingsData = await tx.booking.findMany({
      where: { [role === UserRole.TUTOR ? "tutorId" : "studentId"]: userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        tutorId: true,
        studentId: true,
        categoryId: true,
        bookingDate: true,
        startTime: true,
        endTime: true,
        status: true,
        totalFees: true,
        ...(role === UserRole.TUTOR
          ? { student: { select: { name: true } } }
          : { tutor: { select: { user: { select: { name: true } } } } }),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const bookings = bookingsData.map((booking) => ({
      ...booking,
      ...(role === UserRole.TUTOR
        ? { student: (booking as any).student.name }
        : { tutor: (booking as any).tutor.user.name }),
    }));

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

const joinSession = async (bookingId: string) => {
  const isExist = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!isExist) {
    throw new Error("Booking not found");
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.COMPLETED },
  });
  return updatedBooking;
};

export const bookingService = {
  createBookings,
  userBookings,
  updateBookingStatus,
  joinSession,
};
