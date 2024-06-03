"use client";

import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { deletePost } from "../actions/actions";

interface Props {
  post: Post;
}

export default function DeleteButton({ post }: Props) {
  const session = useSession();
  if (!session.data) return null;

  const { user } = session.data;
  if (!user.isAdmin && user.id !== post.authorId) return null;

  return (
    <button
      className="absolute top-2 right-2"
      onClick={() => deletePost(post.id)}
    >
      🗑️
    </button>
  );
}
