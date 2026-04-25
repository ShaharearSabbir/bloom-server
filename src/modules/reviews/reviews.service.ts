import prisma from "../../lib/prisma";
import { BookingStatus } from "../../prisma/generated/prisma/enums";
import { ICreateReview } from "./reviews.validation";

interface Payload extends ICreateReview {
  studentId: string;
}

const createReview = async (payload: Payload) => {
  const canReview = await prisma.booking.findFirst({
    where: {
      tutorId: payload.tutorId,
      studentId: payload.studentId,
      status: BookingStatus.COMPLETED,
    },
  });

  if (!canReview?.id) {
    throw new Error("You cannot review this tutor");
  }

  const review = await prisma.$transaction(async (tx) => {
    const currentTutor = await tx.tutor.findUnique({
      where: { userId: payload.tutorId },
      select: { avgRating: true, reviewCount: true },
    });

    if (!currentTutor) throw new Error("Tutor not found");

    const oldCount = currentTutor.reviewCount || 0;
    const oldAvg = currentTutor.avgRating || 0;
    const newCount = oldCount + 1;

    const newAvg = (oldAvg * oldCount + payload.rating) / newCount;

    await tx.tutor.update({
      where: { userId: payload.tutorId },
      data: {
        reviewCount: newCount,
        avgRating: newAvg,
      },
    });

    const review = await tx.review.create({ data: payload });

    return review;
  });

  return review;
};

export const reviewsService = {
  createReview,
};
