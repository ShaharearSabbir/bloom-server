import { NextFunction, Request, Response } from "express";
import availabilityService from "./availability.service";
import sendRes from "../../utils/sendRes";

const createTutorAvailabilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.user?.id as string;

    req.body.forEach((slot: any) => {
      slot.tutorId = tutorId;
    });

    const sortedAvailabilities =
      await availabilityService.createTutorAvailabilities(req.body, tutorId);

    return sendRes(
      res,
      201,
      true,
      "Schedule synchronized successfully",
      sortedAvailabilities,
    );
  } catch (error) {
    next(error);
  }
};

const getTutorAvailabilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.user?.id as string;
    const result = await availabilityService.getTutorAvailabilities(tutorId);
    return sendRes(
      res,
      200,
      true,
      "Tutor availabilities fetched successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
};

const availabilityController = {
  createTutorAvailabilities,
  getTutorAvailabilities,
};

export default availabilityController;
