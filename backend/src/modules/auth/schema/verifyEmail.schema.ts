import { z } from "zod";


export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().regex(/^\d{4,6}$/, "OTP must be 4 to 6 digits"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export default verifyEmailSchema;
