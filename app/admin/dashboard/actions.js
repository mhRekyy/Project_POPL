"use server";

import prisma from "@/lib/prisma";

// ============================
// 1. Statistik Admin
// ============================
export async function getAdminStats() {
  const totalUser = await prisma.user.count();
  const totalQuiz = await prisma.quizResult.count();   // jumlah hasil quiz
  const totalAttempt = await prisma.quizResult.count(); // sama, tetapi Anda bebas pisahkan nanti

  const avgScore = await prisma.quizResult.aggregate({
    _avg: { score: true }
  });

  return {
    totalUser,
    totalQuiz,
    totalAttempt,
    avgScore: Math.round(avgScore._avg.score || 0),
  };
}

// ============================
// 2. Aktivitas Terbaru
// ============================
export async function getRecentActivities() {
  const data = await prisma.quizResult.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } }
    }
  });

  // Format ulang agar cocok dengan <ActivityTable />
  return data.map(item => ({
    user: item.user?.name || "Unknown User",
    action: `Level ${item.level} • Score ${item.score}`,
    createdAt: item.createdAt,   // biarkan Date, nanti diubah saat render
  }));
}

// ============================
// 3. Grafik Tren Performa (Bulanan)
// ============================
// Grafik tren performa mingguan
export async function getWeeklyPerformance() {
  const data = await prisma.quizResult.groupBy({
    by: ["createdAt"],
    _avg: { score: true },
    orderBy: { createdAt: "asc" },
  });

  // Kelompokkan berdasarkan minggu (agar tidak terlalu banyak data)
  const weekly = {};

  data.forEach(entry => {
    const week = `${entry.createdAt.getFullYear()}-W${Math.ceil(entry.createdAt.getDate() / 7)}`;

    if (!weekly[week]) {
      weekly[week] = {
        week,
        total: 0,
        count: 0,
        scoreSum: 0,
      };
    }

    weekly[week].count++;
    weekly[week].scoreSum += entry._avg.score ?? 0;
  });

  // Format agar siap dipakai grafik
  return Object.values(weekly).map(w => ({
    week: w.week,
    avgScore: Math.round(w.scoreSum / w.count),
  }));
}

