"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function savePost(formData: FormData) {
  const title = formData.get("title")?.toString() || "Default Title";
  const content = formData.get("content")?.toString();

  const post = await db.post.create({
    data: {
      title,
      content,
      authorId: 1, // hardcoded for now
    },
  });

  revalidatePath("/");
}
