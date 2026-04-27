import { NextFunction, Request, Response } from "express";
import categoryService from "./category.service";
import sendRes from "../../utils/sendRes";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newCategory = req.body;

    const result = await categoryService.createCategory(newCategory);

    return sendRes({
      res,
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const limit = parseInt(req.query.limit as string)

    const result = await categoryService.getCategories(limit);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const tutorController = { createCategory, getCategories };

export default tutorController;
