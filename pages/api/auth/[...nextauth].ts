import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import bcryptjs from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }
        //check if user is in db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);