import { z } from "zod";

export const PostCreateSchema = z.object({
  title: z.string().min(3).max(30),
  content: z.string().max(200).optional(),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;
