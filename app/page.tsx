import { db } from "@/prisma/db";
import PostForm from "./components/PostForm";

export default async function Home() {
  const posts = await db.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className="flex flex-col gap-8 py-24 items-center">
      <PostForm />

      <div className="w-96 flex flex-col gap-2">
        {posts.map((post) => (
          <div className="flex flex-col gap-2 bg-slate-50 p-2" key={post.id}>
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.content}</p>
            <span className="italic text-gray-500 text-xs">
              {post.author.name}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
