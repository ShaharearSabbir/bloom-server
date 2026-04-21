import { NextFunction, Request, Response } from "express";

const checkHit = (req: Request, res: Response, next: NextFunction) => {
  console.log("Hit");

  next();
};

export default checkHit;
