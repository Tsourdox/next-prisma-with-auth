"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
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
    <button className="p-1.5" onClick={() => deletePost(post.id)}>
      <TrashIcon className="size-4 text-neutral-800 dark:text-neutral-400" />
    </button>
  );
}
