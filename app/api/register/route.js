import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redisLogger } from "@/lib/redisLogger"; // Import logger redis

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Cek jika email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // --- LOGGING INFO (User Duplicate) ---
      await redisLogger.info("Registration failed: Email already exists", { email });

      return new Response(
        JSON.stringify({ error: "Email sudah digunakan." }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // --- LOGGING INFO (Success) ---
    // Mencatat bahwa ada pengguna baru yang berhasil mendaftar
    await redisLogger.info("New user registered successfully", { 
      name, 
      email,
      timestamp: new Date().toISOString() 
    });

    return new Response(JSON.stringify({ message: "Registrasi berhasil." }), {
      status: 200,
    });
  } catch (error) {
    // --- LOGGING ERROR ---
    // Mencatat jika terjadi error teknis (misal koneksi database putus)
    await redisLogger.error("Register process error", {
      message: error.message,
      email: email || "unknown"
    });

    console.error("REGISTER ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan server." }),
      { status: 500 }
    );
  }
}