import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { env } from "../env";
import ApiError from "../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, _, res, __) => {
  console.log(`Error: `, { error });

  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
    message = "Internal server error",
    errors: unknown[] | undefined = undefined;

  if (error instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation error";
    errors = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));
    console.log(error.errors, error.stack);
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: env.nodeEnv !== "development" ? error?.stack : undefined,
  })
};

export default globalErrorHandler;
