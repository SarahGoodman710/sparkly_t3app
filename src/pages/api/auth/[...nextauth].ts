import NextAuth, { type NextAuthOptions } from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    // FacebookProvider({
    //   clientId: env.FACEBOOK_ID,
    //   clientSecret: env.FACEBOOK_SECRET,
    // }),
    // AppleProvider({
    //   clientId: env.APPLE_ID,
    //   clientSecret: env.APPLE_SECRET,
    // }),
  ],
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
