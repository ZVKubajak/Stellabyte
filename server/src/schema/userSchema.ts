import { z } from "zod";

export const userIdSchema = z.string().length(24);
export const userEmailSchema = z.string().email();
export const userPasswordSchema = z
  .string()
  .min(8)
  .max(20)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/\d/)
  .regex(/[@$!%*?&]/);
