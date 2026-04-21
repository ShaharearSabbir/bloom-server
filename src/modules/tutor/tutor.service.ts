import prisma from "../../lib/prisma";
import { Prisma } from "../../prisma/generated/prisma/client";
import { TutorCreateInput } from "../../prisma/generated/prisma/models";
import { TutorQueryParams } from "./tutor.validation";

const createTutor = async (payload: TutorCreateInput) => {
  console.log(payload);
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
  const tutorData = await prisma.tutor.findUniqueOrThrow({
    where: { userId },
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
  });

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
    WhereConditions.OR = [
      { category: { name: { contains: query.search, mode: "insensitive" } } },
      { profession: { contains: query.search, mode: "insensitive" } },
      {
        user: {
          name: { contains: query.search, mode: "insensitive" },
        },
      },
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

  console.log({ tutors });

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

const filterData = async () => {
  const result = await prisma.$transaction(async (tx) => {
    const categories = await tx.category.findMany();
    const tutors = await tx.tutor.aggregate({
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
        min: tutors._min.hourlyRate,
        max: tutors._max.hourlyRate,
      },
    };
  });

  return result;
};

const tutorService = {
  createTutor,
  getTutor,
  updateTutor,
  getTutors,
  filterData,
};

export default tutorService;
