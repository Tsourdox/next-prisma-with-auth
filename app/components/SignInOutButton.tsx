"use client";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

export default function SignInOutButton() {
  const session = useSession();

  if (!session.data) return <SignInButton />;

  return <button onClick={() => signOut()}>Sign out</button>;
}
