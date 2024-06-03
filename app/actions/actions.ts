"use server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { PostCreate, PostCreateSchema } from "../validations/post";

export async function savePost(incomingData: PostCreate) {
  const session = await auth();
  if (!session) return;

  const postData = PostCreateSchema.parse(incomingData);

  const post = await db.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      authorId: session.user.id,
    },
  });

  revalidatePath("/");
}
