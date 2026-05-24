import prisma from "../../lib/prisma";
import { BookingStatus, UserRole } from "../../prisma/generated/prisma/enums";
import { UpdateStudentPayload } from "./student.validation";

const getProfile = async (userId: string) => {
  const student = await prisma.user.findFirst({
    where: {
      id: userId,
      role: UserRole.STUDENT,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

const updateProfile = async (userId: string, payload: UpdateStudentPayload) => {
  const isExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!isExist) {
    throw new Error("User not found");
  }

  const student = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
    },
  });
  return student;
};

const studentStats = async (userId: string) => {
  // 1. Verify user exists first
  const isExist = await prisma.user.findUnique({
    where: { id: userId, role: UserRole.STUDENT },
    select: { id: true },
  });

  if (!isExist) {
    throw new Error("User not found");
  }

  const studentId = isExist.id;

  const now = new Date();

  const startOfNextWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 7,
  );
  startOfNextWeek.setHours(0, 0, 0, 0);

  const endOfNextWeek = new Date(
    startOfNextWeek.getFullYear(),
    startOfNextWeek.getMonth(),
    startOfNextWeek.getDate() + 7,
  );
  endOfNextWeek.setHours(23, 59, 59, 999);

  const stats = await prisma.$transaction(async (tx) => {
    const bookingCount = await tx.booking.count({
      where: {
        studentId: studentId,
      },
    });

    const upcomingBookingData = await tx.booking.findMany({
      where: {
        studentId: studentId,
        status: BookingStatus.CONFIRM,
        bookingDate: {
          gte: startOfNextWeek,
          lte: endOfNextWeek,
        },
      },
      orderBy: {
        bookingDate: "asc",
      },
      select: {
        id: true,
        bookingDate: true,
        startTime: true,
        category: {
          select: {
            name: true,
          },
        },
        tutor: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // 4. Safely map data using optional chaining
    const upcomingBooking = upcomingBookingData.map((booking) => ({
      id: booking.id,
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      categoryName: booking.category?.name || "Uncategorized",
      tutorName: booking.tutor?.user?.name || "Unknown Tutor",
    }));

    return { bookingCount, upcomingBooking };
  });

  return stats;
};

const studentService = { getProfile, updateProfile, studentStats };
export default studentService;
