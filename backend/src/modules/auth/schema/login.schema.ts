import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password must not be blank" }),
});

export type LoginInput = z.infer<typeof loginSchema>;