import { NextFunction, Request, Response } from "express";
import sendRes from "../../utils/sendRes";
import { reviewsService } from "./reviews.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;
    req.body.studentId = userId;

    const result = await reviewsService.createReview(req.body);
    return sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const myTutorReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.user?.id as string;
    const result = await reviewsService.MyTutorReview(tutorId);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "My Tutor Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewsController = {
  createReview,
  myTutorReview,
};
