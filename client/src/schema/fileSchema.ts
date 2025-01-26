import { z } from "zod";

// Used for querying a file by ID.
export const singleFileSchema = z.object({
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
export const multiFileSchema = z.array(
  z.object({
    id: z.string().length(24),
    userId: z.string().length(24),
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number().int().positive(),
    s3Url: z.string().url(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);

export const deleteFileSchema = z.string();
export const fileResErrorSchema = z.string();
