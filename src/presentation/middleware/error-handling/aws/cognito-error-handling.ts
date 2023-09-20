import {
  UserNotConfirmedException,
  ExpiredCodeException,
  UserNotFoundException,
  CodeMismatchException,
  UsernameExistsException,
  NotAuthorizedException,
  InvalidParameterException,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextFunction, Request, Response } from "express";

const cognitoErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UsernameExistsException) {
    return res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({
        message: err.message,
        err: err.name,
      });
  }

  if (err instanceof CodeMismatchException) {
    res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({ message: err.message, err: err.name });
  }
  if (err instanceof UserNotFoundException) {
    res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({ message: err.message, err: err.name });
  }
  if (err instanceof ExpiredCodeException) {
    res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({ message: err.message, err: err.name });
  }
  if (err instanceof UserNotConfirmedException) {
    res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({ message: err.message, err: err.name });
  }
  if (err instanceof InvalidParameterException) {
    res
      .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
      .json({ message: err.message, err: err.name });
  }
};

export default cognitoErrorHandler;
