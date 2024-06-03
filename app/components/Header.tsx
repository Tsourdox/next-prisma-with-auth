import Image from "next/image";
import Link from "next/link";
import SignInOutButton from "./SignInOutButton";

export default async function Header() {
  return (
    <header className="flex p-4 bg-slate-200 dark:bg-neutral-900">
      <div className="flex-1">
        <Link
          href="https://github.com/Tsourdox/next-prisma-with-auth"
          target="_blank"
          className="flex-1"
        >
          <Image src="github.svg" width={24} height={24} alt="github logo" />
        </Link>
      </div>
      <h1>Postworld</h1>
      <div className="flex-1 text-right">
        <SignInOutButton />
      </div>
    </header>
  );
}
