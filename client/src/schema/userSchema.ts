import { z } from "zod";
import { fileArraySchema } from "./fileSchema";

export const userSchema = z.object({
  id: z.string().length(24),
  email: z.string().email(),
  myFiles: fileArraySchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userArraySchema = z.array(userSchema);

export const deleteUserSchema = z.string();
export const userResErrorSchema = z.string();
