import { z } from "zod";
import { multiFileSchema } from "./fileSchema";

export const userSchema = z.object({
  id: z.string().length(24),
  email: z.string().email(),
  myFiles: multiFileSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userResSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export const deleteUserSchema = z.object({
  message: z.string(),
});
