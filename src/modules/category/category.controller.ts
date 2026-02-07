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

    return sendRes(res, 201, true, "Category created successfully", result);
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
    const userId = req.user?.id;
    const result = await categoryService.getCategories();
    return sendRes(res, 200, true, "Category fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const tutorController = { createCategory, getCategories };

export default tutorController;
