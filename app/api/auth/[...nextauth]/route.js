import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/hash";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        // ============================
        // 1. LOGIN ADMIN (HARDCODE)
        // ============================
        if (email === "admin@gmail.com" && password === "admin123") {
          return {
            id: "admin-1",
            name: "Admin",
            email: "admin@gmail.com",
            role: "admin",
          };
        }

        // =============================
        // 2. LOGIN USER VIA DATABASE
        // =============================
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: "user",
        };
      }
    })
  ],

  callbacks: {
  async jwt({ token, user }) {
    // Jika user login pertama kali, simpan id & role ke token
    if (user) {
      token.id = user.id;   
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    // Ambil id dari token → masukkan ke session
    session.user.id = token.id;
    session.user.role = token.role;
    return session;
  },

  async redirect({ url, baseUrl }) {
    if (url.startsWith(baseUrl)) return url;
    return baseUrl;
  }
},


  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
