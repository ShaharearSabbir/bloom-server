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

const getTutors = async () => {
  const result = await prisma.tutor.findMany({
    include: {
      user: true,
      category: true,
    },
  });
  const tutors = result.map((tutor) => ({
    id: tutor.userId,
    name: tutor.user.name,
    bio: tutor.bio,
    avatarUrl: tutor.user.image,
    category: tutor.category.name,
    hourlyRate: tutor.hourlyRate,
    // rating: tutor.rating | 0,
    // totalReviews: tutor.totalReviews | 0,
    isVerified: tutor.user.emailVerified,
  }));

  return tutors;
};

const tutorService = { createTutor, getTutor, updateTutor, getTutors };

export default tutorService;
