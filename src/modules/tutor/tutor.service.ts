import prisma from "../../lib/prisma";
import { TutorCreateInput } from "../../prisma/generated/prisma/models";

const createTutor = async (payload: TutorCreateInput) => {
  const tutor = await prisma.tutor.create({ data: payload });
  return tutor;
};

const getTutor = async (tutorId: string) => {
  const tutor = await prisma.tutor.findUnique({ where: { tutorId } });
  return tutor;
};

const tutorService = { createTutor, getTutor };

export default tutorService;
