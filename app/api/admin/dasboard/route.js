import prisma from "@/lib/prisma";
import { redisLogger } from "@/lib/redisLogger"; // Import logger redis

export async function GET() {
  try {
    // Total user
    const totalUsers = await prisma.user.count({
      where: { role: "USER" }
    });

    // Total level quiz
    const totalQuiz = await prisma.quizResult.groupBy({
      by: ["level"],
    });

    // Total attempt (banyak baris QuizResult)
    const totalAttempt = await prisma.quizResult.count();

    // Rata-rata skor
    const avgScore = await prisma.quizResult.aggregate({
      _avg: { score: true }
    });

    // Aktivitas terbaru
    const recentActivities = await prisma.quizResult.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true
      }
    });

    // --- LOGGING INFO ---
    // Mencatat aktivitas sukses akses dashboard
    await redisLogger.info("Admin Dashboard data fetched successfully", {
      totalUsers,
      totalAttempt,
      timestamp: new Date().toISOString()
    });

    return Response.json({
      totalUsers,
      totalQuiz: totalQuiz.length,
      totalAttempt,
      avgScore: Math.round(avgScore._avg.score || 0),
      recentActivities
    });

  } catch (err) {
    // --- LOGGING ERROR ---
    // Mencatat detail error ke Redis agar bisa dipantau
    await redisLogger.error("Failed to fetch Admin Dashboard data", {
      errorMessage: err.message,
      stack: err.stack
    });

    console.error("Dashboard error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}