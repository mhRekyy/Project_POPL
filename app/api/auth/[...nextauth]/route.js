import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/hash";
import { redisLogger } from "@/lib/redisLogger"; // Import logger redis

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

        try {
          // ============================
          // 1. LOGIN ADMIN (HARDCODE)
          // ============================
          if (email === "admin@gmail.com" && password === "admin123") {
            // LOG INFO: Login Admin Berhasil
            await redisLogger.info("Admin login successful", { email });
            
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

          if (!user) {
            // LOG WARN: Email tidak terdaftar
            await redisLogger.error("Login failed: Email not found", { email });
            return null;
          }

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) {
            // LOG WARN: Password salah
            await redisLogger.error("Login failed: Incorrect password", { email });
            return null;
          }

          // LOG INFO: Login User Berhasil
          await redisLogger.info("User login successful", { email, userId: user.id });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: "user",
          };

        } catch (error) {
          // LOG ERROR: Masalah sistem (misal database down)
          await redisLogger.error("NextAuth authorize error", { 
            email, 
            message: error.message 
          });
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;   
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
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