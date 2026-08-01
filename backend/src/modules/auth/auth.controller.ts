import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

// Libs
import { asyncRequestHandler } from "../../lib/asyncRequestHandler.js";
import { prisma } from "../../lib/prisma.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../config/http-exception.js";

const signUp = async (req: express.Request, res: express.Response) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      msg: "Email already in use.",
      statusCode: 409,
    };
  }

  const hashedPassword = await argon2.hash(password);
  const otp = crypto.randomInt(100000, 999999).toString();

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    await tx.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    return newUser;
  });

  // TODO: send OTP email here

  const { password: _omit, ...safeUser } = user;

  return {
    msg: "User created successfully. Please verify your email. OTP has been sent to your email.",
    statusCode: 201,
    data: safeUser,
  };
};

const verifyEmail = async (req: express.Request, res: express.Response) => {
  const { email, otp } = req.body;

  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
      otp,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!otpRecord) {
    throw new BadRequestException("Invalid or expired OTP");
  }

  await prisma.user.update({
    where: { email },
    data: { isEmailVerified: true },
  });

  await prisma.otp.delete({
    where: { id: otpRecord.id },
  });

  return {
    msg: "Email verified successfully",
    statusCode: 200,
  };
};

const signIn = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.query as { email: string; password: string };

  const isUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUser) {
    throw new NotFoundException("User not found");
  }

  if (!isUser.isEmailVerified) {
    throw new UnauthorizedException(
      "Email not verified. We have sent a verification email. Please verify your email before signing in.",
    );
  }

  const isPasswordValid = await argon2.verify(isUser.password, password);

  if (!isPasswordValid) {
    throw new BadRequestException("Invalid password");
  }

  const sessionToken = jwt.sign(
    { userId: isUser.id, email: isUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "28d" },
  );

  const SESSION_TOKEN_EXPIRATION = 3600000 * 28; // 28 days in milliseconds

  res
    .status(200)
    .cookie("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_TOKEN_EXPIRATION,
    })
    .json({
      ok: true,
      msg: "User signed in successfully",
    });
};

const forgotPassword = async (req: express.Request, res: express.Response) => {
  const { email } = req.query as { email: string };

  const isUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUser) {
    throw new NotFoundException("User not found");
  }

  const token = uuidv4();
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.exchangeToken.create({
    data: {
      token,
      userId: isUser.id,
      expiresAt: expirationTime,
    },
  });

  const resetPasswordLink = `${process.env.FRONTEND_URL as string}/reset-password?token=${token}`;

  //   TODO: send reset password email here with the resetPasswordLink

  return {
    msg: "Password reset link has been sent to your email.",
  };
};

const resetPassword = async (req: express.Request, res: express.Response) => {
  const { token } = req.query as { token: string };
  const { newPassword, confirmPassword } = req.body;

  if (!token || typeof token !== "string") {
    throw new BadRequestException("Token is required and must be a string");
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
    throw new BadRequestException("Invalid or expired token");
  }

  const hashedPassword = await argon2.hash(confirmPassword);

  await prisma.user.update({
    where: { id: exchangeToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.exchangeToken.delete({
    where: { id: exchangeToken.id },
  });

  return {
    msg: "Password reset successfully",
    statusCode: 200,
  };
};

export const SignUp = asyncRequestHandler(signUp);
export const VerifyEmail = asyncRequestHandler(verifyEmail);
export const SignIn = asyncRequestHandler(signIn);
export const ForgotPassword = asyncRequestHandler(forgotPassword);
export const ResetPassword = asyncRequestHandler(resetPassword);
