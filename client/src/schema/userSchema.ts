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

export const updateUserSchema = z
  .object({
    newEmail: z.string().email("Invalid email."),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .refine(
        (val) =>
          val.length >= 8 &&
          val.length <= 20 &&
          /[a-z]/.test(val) &&
          /[A-Z]/.test(val) &&
          /\d/.test(val) &&
          /[@$!%*?&]/.test(val),
        {
          message: "Invalid password.",
        }
      ),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Emails do not match.",
    path: ["confirmEmail"],
  });

export const deleteUserSchema = z.string();
export const userResErrorSchema = z.string();
