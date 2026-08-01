import express from "express";
import { HttpException } from "../config/http-exception.js";
import { handleHttpException } from "./httpExceptionFilter.js";

interface Exception {
  ok: boolean;
  msg: string;
  path: string;
  timestamp: string;
  details?: any;
}

export const allExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const exception: Exception = {
    ok: false,
    msg: err.message || "Internal Server Error",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: err.details || {},
  };

  if (err instanceof HttpException)
    return handleHttpException(err, req, res);

  res.status(err.statusCode || 500).json(exception);
};
