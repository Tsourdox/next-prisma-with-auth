import { db } from "@/prisma/db";
import DeleteButton from "./components/DeleteButton";
import PostForm from "./components/PostForm";

export default async function Home() {
  const posts = await db.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className="w-full max-w-[36rem] flex flex-col gap-9 my-9 items-center mx-auto px-3">
      <PostForm />

      <div className="w-full flex flex-col gap-3">
        {posts.map((post) => (
          <div
            className="flex flex-col gap-2 bg-slate-50 dark:bg-neutral-900 p-3"
            key={post.id}
          >
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-xl">{post.title}</h2>
              <DeleteButton post={post} />
            </div>
            <p className="text-sm text-gray-800 dark:text-neutral-400">
              {post.content}
            </p>
            <span className="italic text-gray-500 text-xs">
              {post.author.name}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
