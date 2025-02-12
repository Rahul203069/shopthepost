import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/signup", // Custom sign-in page
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) return false; // Ensure user has an email

      // Check if user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // Create user if they don't exist
        await prisma.user.create({
          data: {
            name: user.name || "Unknown",
            email: user.email,
            image: user.image || "",
          },
        });
      }

      return true; // Allow sign-in
    },
    async session({ session }) {
      if (session?.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id; // Attach user ID to session
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/home`; // Redirect to /home after sign-in
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
