import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email. Please provide a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character"),
});

export const updateUserSchema = z.object({
  email: z.string().email("Invalid email. Please provide a valid email.")
})