import prisma from "../../lib/prisma";
import {
  Prisma,
  UserRole,
  UserStatus,
} from "../../prisma/generated/prisma/client";
import { SearchAndPagination } from "./admin.validation";

const getAllUsers = async (query: SearchAndPagination) => {
  const where: Prisma.UserWhereInput = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const { users, meta } = await prisma.$transaction(async (tx) => {
    const users = await tx.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        image: true,
        role: true,
        status: true,
        emailVerified: true,
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    const count = await tx.user.count({ where });

    const meta = {
      total: count,
      page: query.page,
      totalPages: Math.ceil(count / query.limit),
      limit: query.limit,
    };

    return { users, meta };
  });
  return { users, meta };
};

const updateUserStatus = async (
  userId: string,
  status: { status: UserStatus },
) => {
  const isExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!isExist) {
    throw new Error("User not found");
  }

  if (isExist.role === "ADMIN") {
    throw new Error("Cannot update status of an admin user");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status: status.status },
  });
};

const getAllBookings = async (query: SearchAndPagination) => {
  const where: Prisma.BookingWhereInput = {
    bookingDate: {
      gte: new Date(),
    },
  };

  if (query.search) {
    where.OR = [
      {
        tutor: {
          user: {
            name: { contains: query.search, mode: "insensitive" },
            email: { contains: query.search, mode: "insensitive" },
          },
        },
      },
      {
        student: {
          name: { contains: query.search, mode: "insensitive" },
          email: { contains: query.search, mode: "insensitive" },
        },
      },
      {
        category: {
          name: { contains: query.search, mode: "insensitive" },
        },
      },
    ];
  }

  const { bookings, meta } = await prisma.$transaction(async (tx) => {
    const bookingsData = await tx.booking.findMany({
      where,
      select: {
        status: true,
        id: true,
        tutor: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            categoryId: true,
            name: true,
          },
        },
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    const count = await tx.booking.count({ where });

    const bookings = bookingsData.map((booking) => {
      return {
        id: booking.id,
        status: booking.status,
        tutor: {
          id: booking.tutor?.user?.id || "",
          name: booking.tutor?.user?.name || "Unknown Tutor",
        },
        student: {
          id: booking.student?.id || "",
          name: booking.student?.name || "Unknown Student",
        },
        category: {
          id: booking.category?.categoryId || "",
          name: booking.category?.name || "Uncategorized",
        },
      };
    });

    const meta = {
      total: count,
      page: query.page,
      totalPages: Math.ceil(count / query.limit),
      limit: query.limit,
    };

    return { bookings, meta };
  });
  return { bookings, meta };
};

const adminStats = async () => {
  const stats = await prisma.$transaction(async (tx) => {
    const totalStudents = await tx.user.count({
      where: { role: UserRole.STUDENT },
    });
    const totalTutors = await tx.user.count({
      where: { role: UserRole.TUTOR },
    });
    const totalBookings = await tx.booking.count();

    return {
      totalStudents,
      totalTutors,
      totalBookings,
    };
  });

  return stats;
};

const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  adminStats,
};

export default adminService;
