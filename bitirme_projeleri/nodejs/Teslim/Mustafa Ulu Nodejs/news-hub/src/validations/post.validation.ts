import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120),
    content: z.string().min(10),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120).optional(),
    content: z.string().min(10).optional(),
  }),
});
