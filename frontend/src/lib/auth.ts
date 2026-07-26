import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const googleConfigured =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      id: "reader",
      name: "Continue as reader",
      credentials: {
        intent: { label: "Intent", type: "text" },
      },
      async authorize() {
        return {
          id: "assay-reader",
          name: "Reader",
          email: "reader@assay.local",
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
        } as typeof session.user & { id: string };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "assay-dev-secret-change-me",
};

export { googleConfigured };
