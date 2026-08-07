import express from "express";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

// lib
import { asyncRequestHandler } from "../../lib/asyncRequestHandler.js";
import { prisma } from "../../lib/prisma.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../config/http-exception.js";

const getProfile = async (req: express.Request, res: express.Response) => {
  const userProfile = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      email: true,
      isEmailVerified: true,
      name: true,
      updatedAt: true,
      createdAt: true,
      notes: true,
    },
  });

  if (!userProfile) {
    throw new NotFoundException("User profile not found.");
  }

  return {
    msg: "Profile fetched successfully.",
    data: userProfile,
  };
};

const updateName = async (req: express.Request, res: express.Response) => {
  const { name } = req.query;

  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new BadRequestException("Name is required.");
  }

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      name,
    },
  });

  return {
    msg: "Name updated successfully.",
  };
};

const changeEmailRequest = async (
  req: express.Request,
  res: express.Response,
) => {
  const { newEmail } = req.query;

  if (!newEmail || typeof newEmail !== "string") {
    throw new BadRequestException("New Email is reqired.");
  }

  const token = uuidv4();
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.exchangeToken.create({
    data: {
      token,
      userId: req.user.id,
      data: newEmail,
      expiresAt: expirationTime,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/change-email?token=${token}`;

  //   TODO:- sent email to newEmail for reset link with token

  return {
    msg: "We have sent you a email. Check your inbox or spam folder.",
  };
};

const changeEmail = async (req: express.Request, res: express.Response) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    throw new BadRequestException("Token is required.");
  }

  const exchangeToken = await prisma.exchangeToken.findUnique({
    where: {
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!exchangeToken) {
    throw new BadRequestException("Invalid token or Expired token.");
  }

  await prisma.user.update({
    where: {
      id: exchangeToken.userId,
    },
    data: {
      email: exchangeToken.data,
    },
  });

  return {
    msg: "Email changed successfully.",
  };
};

const changePassword = async (req: express.Request, res: express.Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  const isCurrentPasswordMatches = await argon2.verify(
    user?.password as string,
    currentPassword,
  );

  if (!isCurrentPasswordMatches) {
    throw new UnauthorizedException("Invalid current password.");
  }

  const newPasswordHash = await argon2.hash(confirmPassword);

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      password: newPasswordHash,
    },
  });

  return {
    msg: "Password changed successfully.",
  };
};

export const GetProfile = asyncRequestHandler(getProfile);
export const UpdateName = asyncRequestHandler(updateName);
export const ChangeEmailRequest = asyncRequestHandler(changeEmailRequest);
export const ChangeEmail = asyncRequestHandler(changeEmail);
export const ChangePassword = asyncRequestHandler(changePassword);
