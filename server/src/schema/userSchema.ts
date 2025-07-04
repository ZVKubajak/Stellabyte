import { z } from "zod";
import idSchema from "./idSchema";

export const emailSchema = z.string().email().max(200);
export const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/\d/)
  .regex(/[@$!%*?&]/);

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  id: idSchema,
  email: emailSchema,
  password: passwordSchema,
});
