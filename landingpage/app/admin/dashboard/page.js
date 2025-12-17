import StatsCard from "@/components/StatsCard";
import ActivityTable from "@/components/ActivityTable";
import WeeklyChart from "@/components/WeeklyChart";

import { 
  getAdminStats, 
  getRecentActivities,
  getWeeklyPerformance 
} from "./actions";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const activitiesRaw = await getRecentActivities();
  const weeklyData = await getWeeklyPerformance();

  const activities = activitiesRaw.map(a => ({
    ...a,
    time: a.createdAt
      ? new Date(a.createdAt).toLocaleString("id-ID")
      : "-",
  }));

  return (
    <div className="p-6">
      
      <h1 className="text-5xl font-bold text-green-700 mb-20">
        Dashboard Admin
      </h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total User" value={stats.totalUser} icon="👥" />
        <StatsCard title="Total Quiz" value={stats.totalQuiz} icon="📝" />
        <StatsCard title="Total Attempt" value={stats.totalAttempt} icon="🎯" />
        <StatsCard title="Avg Score" value={stats.avgScore} icon="⭐" />
      </div>

      {/* Grafik */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Tren Performa Mingguan
        </h2>
        <WeeklyChart data={weeklyData} />
      </div>

      {/* Aktivitas */}
      <ActivityTable activities={activities} />
    </div>
  );
}
