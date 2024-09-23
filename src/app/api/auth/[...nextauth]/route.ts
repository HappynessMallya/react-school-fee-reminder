
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials are required');
        }
        // Find user in the database by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare password with hashed password stored in the database
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        console.log('Tumefika ndani...')

        // If password matches, return the user object
        return { id: user.id, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach role to session
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Redirect users to the login page
  },
  session: {
    strategy: "jwt"
  }
});
export { handler as GET, handler as POST}
