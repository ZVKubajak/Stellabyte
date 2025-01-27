import { z } from "zod";

export const supportSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name can not be more than 50 characters."),
  email: z.string().email("Invalid email."),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(1000, "Message can not be more than 1000 characters."),
});

export const responseSchema = z.object({
  data: supportSchema,
  message: z.string(),
  success: z.boolean(),
});
