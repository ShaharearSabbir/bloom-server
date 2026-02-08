import prisma from "../../lib/prisma";
import { TutorCreateInput } from "../../prisma/generated/prisma/models";

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
  const tutor = await prisma.tutor.findUniqueOrThrow({
    where: { userId },
  });

  return tutor;
};

export const getTutors = async () => {
  const tutors = await prisma.tutor.findMany({
    select: {
      userId: true, // This is your primary key now
      bio: true,
      hourlyRate: true,
      avgRating: true,
      reviewCount: true,
      user: {
        select: { name: true, image: true, emailVerified: true },
      },
      category: {
        select: { name: true },
      },
    },
    orderBy: {
      avgRating: "desc",
    },
  });

  return tutors.map((t) => ({
    id: t.userId, // Identical to userId
    name: t.user.name,
    bio: t.bio,
    image: t.user.image,
    category: t.category?.name || "Uncategorized",
    hourlyRate: t.hourlyRate,
    rating: Number(t.avgRating.toFixed(1)),
    totalReviews: t.reviewCount,
    isVerified: !!t.user.emailVerified,
  }));
};

const tutorService = { createTutor, getTutor, updateTutor, getTutors };

export default tutorService;

getTutors();
