import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*/,
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
