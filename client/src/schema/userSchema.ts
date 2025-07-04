import { z } from "zod";
import fileSchema from "./fileSchema";

export type User = z.infer<typeof userSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

const userSchema = z.object({
  id: z.string().length(24),
  email: z.string().email().max(200),
  myFiles: z.array(fileSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

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

export default userSchema;
