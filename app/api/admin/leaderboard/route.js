import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    return NextResponse.json(leaderboardWithUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
