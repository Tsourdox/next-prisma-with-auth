import { db } from "@/prisma/db";
import { savePost } from "./actions/actions";

export default async function Home() {
  const posts = await db.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className="flex flex-col gap-8 py-24 items-center">
      <form className="w-96 flex flex-col gap-2" action={savePost}>
        <input name="title" type="text" placeholder="Title" />
        <textarea name="content" rows={4} placeholder="Content" />
        <button>Save Post</button>
      </form>

      <div className="w-96 flex flex-col gap-2">
        {posts.map((post) => (
          <div className="flex flex-col gap-2" key={post.id}>
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.content}</p>
            <span className="italic text-gray-500">{post.author.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
