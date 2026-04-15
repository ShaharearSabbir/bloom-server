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
    const result = await categoryService.getCategories();
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
