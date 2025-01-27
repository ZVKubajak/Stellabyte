import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password can not be more than 20 characters.")
      .regex(/[a-z]/, "Password must include at least 1 lowercase letter.")
      .regex(/[A-Z]/, "Password must include at least 1 uppercase letter.")
      .regex(/\d/, "Password must include at least 1 number.")
      .regex(
        /[@$!%*?&]/,
        "Password must include at least 1 special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password can not be more than 20 characters.")
    .regex(/[a-z]/, "Password must include at least 1 lowercase letter.")
    .regex(/[A-Z]/, "Password must include at least 1 uppercase letter.")
    .regex(/\d/, "Password must include at least 1 number.")
    .regex(/[@$!%*?&]/, "Password must include at least 1 special character."),
});

export const tokenSchema = z.string().jwt()
