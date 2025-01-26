import { z } from "zod";

export const singleFileSchema = z.object({
  message: z.string(),
  file: z.object({
    id: z.string().length(24),
    userId: z.string().length(24),
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number().int().positive(),
    s3Url: z.string().url(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

export const multiFileSchema = z.object({
  message: z.string(),
  file: z.array(
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
  ),
});

export const deleteFileSchema = z.object({
  message: z.string(),
});
