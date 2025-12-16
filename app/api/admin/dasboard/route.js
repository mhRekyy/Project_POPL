import prisma from "@/lib/prisma";

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

    return Response.json({
      totalUsers,
      totalQuiz: totalQuiz.length,
      totalAttempt,
      avgScore: Math.round(avgScore._avg.score || 0),
      recentActivities
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
