import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email as string,
            image: user.image,
          },
        });
        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user!.email = token.email;
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log(url);
      return `${baseUrl}/signedin`;
    },
  },
};
