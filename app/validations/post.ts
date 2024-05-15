import { z } from "zod";

export const PostCreateSchema = z.object({
  title: z.string().min(3).max(20),
  content: z.string().max(100).optional(),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;
