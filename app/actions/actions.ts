"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { PostCreate, PostCreateSchema } from "../validations/post";

export async function savePost(incomingData: PostCreate) {
  const postData = PostCreateSchema.parse(incomingData);

  const post = await db.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      authorId: 1, // hardcoded for now
    },
  });

  revalidatePath("/");
}
