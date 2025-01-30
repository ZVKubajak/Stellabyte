import { z } from "zod";

// Used for querying a file by ID.
export const fileSchema = z.object({
  id: z.string().length(24),
  userId: z.string().length(24),
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number().int().positive(),
  s3Url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Used in userSchema.
export const fileArraySchema = z.array(fileSchema).or(
  z.object({
    message: z.string(),
  })
);

export const deleteFileSchema = z.object({
  message: z.string(),
});

export const fileResErrorSchema = z.string();
