import { z } from "zod";

export const addCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(500),
  }),
});
