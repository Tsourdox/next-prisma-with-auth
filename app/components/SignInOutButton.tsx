"use client";
import { useSession } from "next-auth/react";
import { signOutUser } from "../actions/actions";
import SignInButton from "./SignInButton";

export default function SignInOutButton() {
  const session = useSession();

  if (!session.data) return <SignInButton />;

  return (
    <form action={signOutUser}>
      <button>{session.data.user.name} - Sign out</button>
    </form>
  );
}
