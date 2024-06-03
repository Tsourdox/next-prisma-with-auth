import Image from "next/image";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";

export default async function Header() {
  return (
    <header className="flex items-center p-3 bg-slate-200 dark:bg-neutral-900">
      <div className="flex-1">
        <Link
          href="https://github.com/Tsourdox/next-prisma-with-auth"
          target="_blank"
          className="flex-1"
        >
          <Image
            src="github.svg"
            width={24}
            height={24}
            className="logo"
            alt="github logo"
          />
        </Link>
      </div>
      <h1>
        <span className="block sm:hidden">Playground</span>
        <span className="hidden sm:block">
          NextJS · AuthJS · Prisma · Neon · Vercel
        </span>
      </h1>
      <div className="flex-1 text-right">
        <SignInOutButton />
      </div>
    </header>
  );
}
