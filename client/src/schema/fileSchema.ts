import { z } from "zod";

export type File = z.infer<typeof fileSchema>;

const fileSchema = z.object({
  id: z.string().length(24),
  userId: z.string().length(24),
  name: z.string(),
  type: z.string(),
  size: z.number().int().nonnegative(),
  s3Url: z.string().url().max(500),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export default fileSchema;
