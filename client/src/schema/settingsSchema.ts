import { z } from "zod";

export const settingsSchema = z
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
