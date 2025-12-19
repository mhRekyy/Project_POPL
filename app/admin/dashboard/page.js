import StatsCard from "@/components/StatsCard";
import ActivityTable from "@/components/ActivityTable";
import WeeklyChart from "@/components/WeeklyChart";
import { LayoutDashboard, TrendingUp, Zap } from "lucide-react"; // Install lucide-react jika belum

import {
  getAdminStats,
  getRecentActivities,
  getWeeklyPerformance
} from "./actions";

export const dynamic = "force-dynamic";

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
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-5xl font-extrabold text-white flex items-center gap-4 tracking-tight">
            <LayoutDashboard size={48} className="text-white" />
            Dashboard Overview
          </h1>
          <p className="text-green-100 text-lg mt-2 font-medium">
            Selamat datang kembali! Berikut adalah ringkasan performa EngLite hari ini.
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white self-start md:self-center">
          <Zap size={18} className="text-yellow-300 fill-yellow-300" />
          <span className="text-sm font-bold uppercase tracking-wider">System Live</span>
        </div>
      </div>

      {/* Stats Grid - Menampilkan StatsCard dengan container modern */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total User" value={stats.totalUser} icon="👥" color="green" />
        <StatsCard title="Total Quiz" value={stats.totalQuiz} icon="📝" color="blue" />
        <StatsCard title="Total Attempt" value={stats.totalAttempt} icon="🎯" color="orange" />
        <StatsCard title="Avg Score" value={stats.avgScore} icon="⭐" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Chart Section - Mengambil 2/3 lebar pada layar besar */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Tren Performa Mingguan
            </h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Real-time Analytics</span>
          </div>
          <div className="h-[300px] w-full">
             <WeeklyChart data={weeklyData} />
          </div>
        </div>

        {/* Info Tambahan / Mini Stats - Mengambil 1/3 lebar */}
        <div className="bg-green-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-center text-white">
          <h3 className="text-xl font-bold mb-4 italic opacity-80">"Education is the most powerful weapon which you can use to change the world."</h3>
          <p className="text-green-200">— Nelson Mandela</p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span>Database Health</span>
              <span className="font-bold text-green-400">100%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-green-400 h-full w-full shadow-[0_0_10px_#4ade80]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Table Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-2 border border-white/20 overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Aktivitas Pengguna Terbaru</h2>
          <p className="text-gray-500 text-sm mb-4">Daftar percobaan kuis yang dilakukan oleh user secara real-time.</p>
        </div>
        <ActivityTable activities={activities} />
      </div>
    </div>
  );
}