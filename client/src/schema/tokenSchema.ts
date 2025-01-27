import { z } from "zod";

export const tokenSchema = z.object({
  id: z.string().length(24),
  email: z.string().email(),
});
