import { get } from "node:http";
import prisma from "../../lib/prisma";
import { AvailabilityCreateManyInput } from "../../prisma/generated/prisma/models";

const createTutorAvailabilities = async (
  payload: AvailabilityCreateManyInput,
  tutorId: string,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const isDeleted = await tx.availability.deleteMany({ where: { tutorId } });

    if (isDeleted) {
      await tx.availability.createMany({ data: payload });
      const updatedData = await tx.availability.findMany({
        where: { tutorId },
      });
      return updatedData;
    }
  });
  return result;
};

const getTutorAvailabilities = async (tutorId: string) => {
  const result = await prisma.availability.findMany({ where: { tutorId } });
  return result;
};

const availabilityService = {
  createTutorAvailabilities,
  getTutorAvailabilities,
};
export default availabilityService;
