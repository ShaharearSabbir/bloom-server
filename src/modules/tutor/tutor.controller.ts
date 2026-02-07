import { NextFunction, Request, Response } from "express";
import tutorService from "./tutor.service";
import sendRes from "../../utils/sendRes";

const createTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTutor = req.body;

    newTutor.userId = req.user?.id;

    const result = await tutorService.createTutor(newTutor);

    return sendRes(res, 201, true, "Tutor created successfully", result);
  } catch (error) {
    next(error);
  }
};

const tutorController = { createTutor };

export default tutorController;
