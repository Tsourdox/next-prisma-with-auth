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

export async function deletePost(id: number) {
  const session = await auth();
  if (!session) return;

  const post = await db.post.findUnique({ where: { id } });
  if (!post) return;

  if (session.user.isAdmin || post.authorId === session.user.id) {
    await db.post.delete({ where: { id } });
  }

  revalidatePath("/");
}
