import { z } from "zod";

export const fileIdSchema = z.string().length(24);
export const fileUserIdSchema = z.string().length(24);
