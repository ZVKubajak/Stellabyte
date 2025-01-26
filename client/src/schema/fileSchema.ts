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

export const singleFileResSchema = z.object({
  message: z.string(),
  file: singleFileSchema,
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

export const multiFileResSchema = z.object({
  message: z.string(),
  file: multiFileSchema,
});

export const deleteFileSchema = z.object({
  message: z.string(),
});
