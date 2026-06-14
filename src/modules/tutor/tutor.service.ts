import prisma from "../../lib/prisma";
import { BookingStatus, Prisma } from "../../prisma/generated/prisma/client";
import { TutorCreateInput } from "../../prisma/generated/prisma/models";
import { TutorQueryParams } from "./tutor.validation";

const createTutor = async (payload: TutorCreateInput) => {
  const tutor = await prisma.tutor.create({ data: payload });
  return tutor;
};

const updateTutor = async (userId: string, payload: TutorCreateInput) => {
  const tutor = await prisma.tutor.update({
    where: { userId },
    data: payload,
  });
  return tutor;
};

const getTutor = async (userId: string) => {
  const tutorData = await prisma.tutor.findUnique({
    where: { userId },
    select: {
      userId: true,
      bio: true,
      hourlyRate: true,
      avgRating: true,
      reviewCount: true,
      reviews: {
        include: {
          student: {
            select: {
              name: true,
            },
          },
        },
      },
      bookings: {
        where: {
          bookingDate: {
            gte: new Date(),
          },
        },
        select: {
          bookingDate: true,
          endTime: true,
          startTime: true,
        },
      },
      availability: {
        select: { dayOfWeek: true, startTime: true, endTime: true },
      },
      user: {
        select: { name: true, image: true, emailVerified: true },
      },
      category: {
        select: { name: true, categoryId: true },
      },
    },
  });

  if (!tutorData) throw new Error("Tutor not found");

  const tutor = {
    id: tutorData.userId,
    name: tutorData.user.name,
    bio: tutorData.bio,
    image: tutorData.user.image,
    category: tutorData.category?.name || "Uncategorized",
    categoryId: tutorData.category.categoryId,
    hourlyRate: tutorData.hourlyRate,
    rating: Number(tutorData.avgRating.toFixed(1)),
    totalReviews: tutorData.reviewCount,
    reviews: tutorData.reviews,
    isVerified: !!tutorData.user.emailVerified,
    availability: tutorData.availability,
    upcomingBookings: tutorData.bookings,
  };

  return tutor;
};

const getTutors = async (query: TutorQueryParams) => {
  const WhereConditions: Prisma.TutorWhereInput = {};

  if (query.category) {
    WhereConditions.category = {
      name: query.category,
    };
  }

  if (query.search) {
    const searchTerm = query.search.trim();

    const isNumeric = searchTerm !== "" && !isNaN(Number(searchTerm));
    const numericValue = isNumeric ? Number(searchTerm) : null;

    WhereConditions.OR = [
      { category: { name: { contains: searchTerm, mode: "insensitive" } } },
      { profession: { contains: searchTerm, mode: "insensitive" } },
      { user: { name: { contains: searchTerm, mode: "insensitive" } } },

      ...(numericValue !== null
        ? [
            { hourlyRate: { gte: numericValue } },
            { avgRating: { gte: numericValue } },
          ]
        : []),
    ];
  }

  if (query.minPrice) {
    WhereConditions.hourlyRate = {
      gte: query.minPrice,
    };
  }

  if (query.maxPrice) {
    WhereConditions.hourlyRate = {
      lte: query.maxPrice,
    };
  }

  const orderByCondition: Prisma.TutorOrderByWithRelationInput = {};

  if (query.sortBy === "price_asc") {
    orderByCondition.hourlyRate = "asc";
  } else if (query.sortBy === "price_desc") {
    orderByCondition.hourlyRate = "desc";
  } else {
    orderByCondition.createdAt = "desc";
  }

  const take = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * take;

  const tutorData = await prisma.$transaction(
    async (tx) => {
      const tutors = await tx.tutor.findMany({
        where: WhereConditions,
        take: take,
        skip: skip,
        select: {
          userId: true,
          bio: true,
          hourlyRate: true,
          avgRating: true,
          reviewCount: true,
          bookings: {
            where: {
              bookingDate: {
                gte: new Date(),
              },
            },
            select: {
              bookingDate: true,
              endTime: true,
              startTime: true,
            },
          },
          availability: {
            select: { dayOfWeek: true, startTime: true, endTime: true },
          },
          user: {
            select: { name: true, image: true, emailVerified: true },
          },
          category: {
            select: { name: true, categoryId: true },
          },
        },
        orderBy: orderByCondition,
      });

      const totalCount = await tx.tutor.count({
        where: WhereConditions,
      });

      return { tutors, totalCount };
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );

  const tutors = tutorData.tutors.map((t) => ({
    id: t.userId,
    name: t.user.name,
    bio: t.bio,
    image: t.user.image,
    category: t.category?.name || "Uncategorized",
    categoryId: t.category.categoryId,
    hourlyRate: t.hourlyRate,
    rating: Number(t.avgRating.toFixed(1)),
    totalReviews: t.reviewCount,
    isVerified: !!t.user.emailVerified,
    availability: t.availability,
    upcomingBookings: t.bookings,
  }));

  return {
    tutors,
    meta: {
      total: tutorData.totalCount,
      page: page,
      totalPages: Math.ceil(tutorData.totalCount / take),
      limit: take,
    },
  };
};

const getFeaturedTutors = async () => {
  const tutorData = await prisma.tutor.findMany({
    where: {
      isFeatured: true,
    },
    take: 6,
    select: {
      userId: true,
      bio: true,
      hourlyRate: true,
      avgRating: true,
      bookings: {
        where: {
          bookingDate: {
            gte: new Date(),
          },
        },
        select: {
          bookingDate: true,
          endTime: true,
          startTime: true,
        },
      },
      reviewCount: true,
      availability: {
        select: { dayOfWeek: true, startTime: true, endTime: true },
      },
      user: {
        select: { name: true, image: true, emailVerified: true },
      },
      category: {
        select: { name: true, categoryId: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const tutors = tutorData.map((t) => ({
    id: t.userId,
    name: t.user.name,
    bio: t.bio,
    image: t.user.image,
    category: t.category?.name || "Uncategorized",
    categoryId: t.category.categoryId,
    hourlyRate: t.hourlyRate,
    rating: Number(t.avgRating.toFixed(1)),
    totalReviews: t.reviewCount,
    isVerified: !!t.user.emailVerified,
    availability: t.availability,
    upcomingBookings: t.bookings,
  }));

  return tutors;
};

const filterData = async () => {
  const result = await prisma.$transaction(async (tx) => {
    const categories = await tx.category.findMany();
    const tutorData = await tx.tutor.aggregate({
      _max: {
        hourlyRate: true,
      },
      _min: {
        hourlyRate: true,
      },
    });

    return {
      categories,
      priceRange: {
        min: tutorData._min.hourlyRate,
        max: tutorData._max.hourlyRate,
      },
    };
  });

  return result;
};

const tutorStats = async (tutorId: string) => {
  const isExist = await prisma.tutor.findUnique({
    where: { userId: tutorId },
    select: { userId: true },
  });

  if (!isExist) throw new Error("Tutor not found");

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
    const bookingStats = await tx.booking.aggregate({
      where: { tutorId },
      _count: { studentId: true, id: true },
      _sum: { totalFees: true },
    });

    const upcomingBookingData = await tx.booking.findMany({
      where: {
        tutorId,
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
        student: {
          select: {
            name: true,
          },
        },
      },
    });

    const upcomingBooking = upcomingBookingData.map((booking) => ({
      id: booking.id,
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      categoryName: booking.category?.name || "Uncategorized",
      studentName: booking.student?.name || "Unknown Student",
    }));

    const avgRating = await tx.review.aggregate({
      where: { tutorId },
      _avg: { rating: true },
    });

    return {
      totalStudent: bookingStats._count.studentId,
      totalEarnings: bookingStats._sum.totalFees,
      totalSessions: bookingStats._count.id,
      avgRating: Number(avgRating._avg.rating?.toFixed(1)) || 0,
      upcomingBooking,
    };
  });

  return stats;
};

const tutorService = {
  createTutor,
  getTutor,
  updateTutor,
  getTutors,
  filterData,
  getFeaturedTutors,
  tutorStats,
};

export default tutorService;
