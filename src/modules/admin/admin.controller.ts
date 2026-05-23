import { NextFunction, Request, Response } from "express";
import adminService from "./admin.service";
import sendRes from "../../utils/sendRes";
import { searchAndPagination } from "./admin.validation";
import { UserStatus } from "../../prisma/generated/prisma/enums";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = searchAndPagination.safeParse(req.query);

    if (!validated.success) {
      return sendRes({
        res,
        statusCode: 400,
        success: false,
        message: "Invalid query parameters",
        error: validated.error.format(),
      });
    }

    const query = validated.data;

    const { users, meta } = await adminService.getAllUsers(query);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Users fetched successfully",
      data: users,
      meta: meta,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = searchAndPagination.safeParse(req.query);

    if (!validated.success) {
      return sendRes({
        res,
        statusCode: 400,
        success: false,
        message: "Invalid query parameters",
        error: validated.error.format(),
      });
    }

    const query = validated.data;

    const { bookings, meta } = await adminService.getAllBookings(query);
    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
      meta: meta,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.body as { status: UserStatus };

    console.log(status);

    if (!status || !Object.values(UserStatus).includes(status.status)) {
      return sendRes({
        res,
        statusCode: 400,
        success: false,
        message: "Invalid status value",
      });
    }

    const userId = req.params.id;

    await adminService.updateUserStatus(userId as string, status);

    return sendRes({
      res,
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const adminController = { getAllUsers, getAllBookings, updateUserStatus };

export default adminController;
