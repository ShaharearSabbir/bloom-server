import prisma from "../../lib/prisma";
import { TutorCreateInput } from "../../prisma/generated/prisma/models";

const createTutor = async (payload: TutorCreateInput) => {
  const tutor = await prisma.tutor.create({ data: payload });
  return tutor;
};

const tutorService = { createTutor };

export default tutorService;
