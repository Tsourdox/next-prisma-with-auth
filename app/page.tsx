import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { signOutUser } from "./actions/actions";
import PostForm from "./components/PostForm";
import SignInButton from "./components/SignInButton";

export default async function Home() {
  const session = await auth();

  const posts = await db.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className="flex flex-col gap-8 py-24 items-center">
      {session?.user && (
        <header>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          <form action={signOutUser}>
            <button>Sign out</button>
          </form>
        </header>
      )}
      {session?.user ? <PostForm /> : <SignInButton />}

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
