import { NextFunction, Request, Response } from "express";
import tutorService from "./tutor.service";
import sendRes from "../../utils/sendRes";
import { getTutorQueryZodSchema } from "./tutor.validation";

const createTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTutor = req.body;

    newTutor.userId = req.user?.id;

    const result = await tutorService.createTutor(newTutor);

    return sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Tutor created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const result = await tutorService.updateTutor(userId as string, req.body);
    return sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Tutor updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const result = await tutorService.getTutor(userId as string);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Tutor profile fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTutors = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;

  const validatedQuery = getTutorQueryZodSchema.safeParse(query);

  if (!validatedQuery.success) {
    return sendRes({
      res,
      statusCode: 400,
      success: false,
      message: "Invalid query parameters",
      error: validatedQuery.error.format(),
    });
  }

  try {
    const result = await tutorService.getTutors(validatedQuery.data);

    console.log(result);

    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Tutors fetched successfully",
      data: result.tutors,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

const getTutorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id;

    const result = await tutorService.getTutor(tutorId as string);

    if (!result) {
      return sendRes({
        res,
        statusCode: 404,
        success: false,
        message: "Tutor not found",
      });
    }

    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Tutor fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const filterData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.filterData();

    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Filter data fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const tutorController = {
  createTutor,
  getMyTutor,
  updateTutor,
  getTutors,
  filterData,
  getTutorById,
};

export default tutorController;
