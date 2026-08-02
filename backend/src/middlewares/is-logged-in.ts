import express from "express";
import jwt from "jsonwebtoken";

// lib
import { prisma } from "../lib/prisma.js";

import { AppConstants } from "../config/constants.js";
import {
  NotFoundException,
  UnauthorizedException,
} from "../config/http-exception.js";

export const isLoggedIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.cookies[AppConstants.sessionTokenName];

  if (!token) {
    throw new UnauthorizedException(
      "You are not logged in. Please log in to access this resource.",
    );
  }

  const validToken = (await jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  )) as { userId: string };

  if (!validToken) {
    throw new UnauthorizedException("Invalid token. Please log in again.");
  }

  const user = await prisma.user.findUnique({
    where: { id: validToken.userId },
    select: {
      id: true,
      name: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found.");
  }

  req.user = user;
  next();
};
