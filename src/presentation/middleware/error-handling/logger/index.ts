import { NextFunction, Request, Response } from "express";
import { errLogger } from "../../../../utils/winston-logger";

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errLogger.error(err);
  next(err); // calling next middleware
};

export default errorLogger;
