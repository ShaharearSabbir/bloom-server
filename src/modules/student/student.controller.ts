import { NextFunction, Request, Response } from "express";
import studentService from "./student.service";
import sendRes from "../../utils/sendRes";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const result = await studentService.getProfile(userId as string);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Student profile fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const result = await studentService.updateProfile(
      userId as string,
      req.body,
    );
    return sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Student updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const studentController = { getProfile, updateProfile };
export default studentController;
