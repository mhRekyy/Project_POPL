import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redisLogger } from "@/lib/redisLogger"; // Import logger redis

export async function GET() {
  try {
    const leaderboard = await prisma.quizResult.groupBy({
      by: ["userId"],
      _avg: { score: true },
      _count: { score: true },
      orderBy: {
        _avg: { score: "desc" }
      }
    });

    const leaderboardWithUser = await Promise.all(
      leaderboard.map(async (item) => {
        const user = await prisma.user.findUnique({
          where: { id: item.userId },
          select: { name: true, email: true }
        });
        return {
          userId: item.userId,
          name: user?.name,
          email: user?.email,
          avgScore: Math.round(item._avg.score),
          attempt: item._count.score
        };
      })
    );

    // --- LOGGING INFO ---
    // Mencatat bahwa leaderboard berhasil ditarik, membantu melihat aktivitas populer
    await redisLogger.info("Leaderboard data retrieved", {
      totalParticipants: leaderboardWithUser.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(leaderboardWithUser);
  } catch (error) {
    // --- LOGGING ERROR ---
    // Mencatat jika ada kegagalan query atau mapping data
    await redisLogger.error("Error fetching leaderboard", {
      message: error.message,
      stack: error.stack
    });

    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}