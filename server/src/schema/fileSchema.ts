import { z } from "zod";

export const fileSchema = z.object({
  id: z.string().length(24),
  userId: z.string().length(24),
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number().int().nonnegative(),
  s3Url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
