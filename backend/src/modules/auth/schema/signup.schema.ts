import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain a number")
    .regex(/(?=.*[^A-Za-z0-9])/, "Password must contain a special character"),
});
