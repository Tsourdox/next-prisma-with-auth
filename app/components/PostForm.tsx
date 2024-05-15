"use client";

import { useForm } from "react-hook-form";
import { savePost } from "../actions/actions";
import { PostCreate } from "../validations/post";

export default function PostForm() {
  const form = useForm<PostCreate>();

  const handleSubmit = async (data: PostCreate) => {
    await savePost(data);
    form.reset();
  };

  return (
    <form
      className="w-96 flex flex-col gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <input {...form.register("title")} type="text" placeholder="Title" />
      <textarea {...form.register("content")} rows={4} placeholder="Content" />
      <button>Save Post</button>
    </form>
  );
}
