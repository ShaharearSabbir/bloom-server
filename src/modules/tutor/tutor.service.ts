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

const tutorService = { createTutor, getTutor, updateTutor };

export default tutorService;
