import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import apple from "next-auth/providers/apple";
import discord from "next-auth/providers/discord";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { db } from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [github, apple, google, discord],
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.isAdmin = user.isAdmin;
      return session;
    },
  },
});

declare module "next-auth" {
  interface User {
    isAdmin: boolean;
  }
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
