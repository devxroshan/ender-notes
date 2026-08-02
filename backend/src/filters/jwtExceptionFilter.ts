import express from "express";
import jwt from "jsonwebtoken";

import { type Exception } from "./allExceptionFilter.js";

export const handleJwtExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
) => {
  let errObj: Exception = {
    ok: false,
    msg: "Invalid token. Please log in again.",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: {},
  };

  if (err instanceof jwt.JsonWebTokenError) {
    errObj.msg = "Invalid token. Please log in again.";
  }

  if (err instanceof jwt.TokenExpiredError) {
    errObj.msg = "Token has expired. Please log in again.";
  }

  if (err instanceof jwt.NotBeforeError) {
    errObj.msg = "Token is not active yet. Please log in again.";
  }

  res.status(401).json({
    ok: false,
    msg: errObj.msg,
    details: errObj.details ?? {},
  });
};
