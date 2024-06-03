"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { savePost } from "../actions/actions";
import { PostCreate, PostCreateSchema } from "../validations/post";

export default function PostForm() {
  const session = useSession();

  const form = useForm<PostCreate>({ resolver: zodResolver(PostCreateSchema) });

  const {
    formState: { errors },
  } = form;

  const handleSubmit = async (data: PostCreate) => {
    await savePost(data);
    form.reset();
  };

  if (!session.data) return null;

  return (
    <form
      className="w-96 flex flex-col gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <input
        {...form.register("title")}
        type="text"
        placeholder="Title"
        className="bg-slate-100 dark:bg-neutral-800 p-1"
      />
      {errors.title && (
        <span className="text-red-500">{errors.title.message}</span>
      )}
      <textarea
        {...form.register("content")}
        rows={4}
        placeholder="Content"
        className="bg-slate-100 dark:bg-neutral-800 p-1"
      />
      {errors.content && (
        <span className="text-red-500">{errors.content.message}</span>
      )}
      <button className="hover:bg-slate-50 hover:dark:bg-neutral-900 p-2">
        Save Post
      </button>
    </form>
  );
}
