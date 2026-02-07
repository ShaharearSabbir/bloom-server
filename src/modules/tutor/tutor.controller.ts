import { NextFunction, Request, Response } from "express";
import tutorService from "./tutor.service";

const createTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTutor = req.body;
    newTutor.userId = req.user.id;

    const result = await tutorService.createTutor(newTutor);
  } catch (error) {
    next(error);
  }
};

const tutorController = { createTutor };

export default tutorController;
