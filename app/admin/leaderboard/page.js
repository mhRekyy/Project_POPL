"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, Award, Star, User, Mail, Target } from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.sort((a, b) => {
          const attemptA = Number(a.attempt);
          const attemptB = Number(b.attempt);
          const avgA = Number(a.avgScore);
          const avgB = Number(b.avgScore);

          if (attemptB === attemptA) return avgB - avgA;
          return attemptB - attemptA;
        });

        setData(sorted);
        setLoading(false);
      });
  }, []);

  // Top 3 for Podium
  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  const getRankStyle = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600 shadow-yellow-500/50 scale-110 z-10";
    if (rank === 2) return "from-gray-300 to-gray-500 shadow-gray-400/50";
    if (rank === 3) return "from-orange-400 to-orange-600 shadow-orange-500/50";
    return "";
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-white flex items-center gap-4 tracking-tight">
          <Trophy size={48} className="text-yellow-400" />
          Hall of Fame
        </h1>
        <p className="text-green-100 text-lg mt-2 font-medium">
          Apresiasi untuk mereka yang paling rajin belajar dan meraih skor terbaik.
        </p>
      </div>

      {/* Podium Section (Top 3) */}
      {!loading && topThree.length > 0 && (
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16 mt-10">
          {/* Rank 2 */}
          {topThree[1] && (
            <div className={`order-2 md:order-1 flex flex-col items-center p-6 bg-gradient-to-b rounded-3xl w-full md:w-56 shadow-xl border border-white/20 text-white ${getRankStyle(2)}`}>
              <Medal size={40} className="mb-2" />
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">2nd Place</p>
              <h3 className="text-xl font-bold mt-2 text-center line-clamp-1">{topThree[1].name}</h3>
              <p className="text-2xl font-black mt-1">{Number(topThree[1].avgScore).toFixed(1)}</p>
            </div>
          )}

          {/* Rank 1 */}
          {topThree[0] && (
            <div className={`order-1 md:order-2 flex flex-col items-center p-8 bg-gradient-to-b rounded-[2.5rem] w-full md:w-64 shadow-2xl border border-white/30 text-white ${getRankStyle(1)}`}>
              <Trophy size={60} className="mb-2 animate-bounce" />
              <p className="text-sm font-black opacity-90 uppercase tracking-[0.2em]">Grand Champion</p>
              <h3 className="text-2xl font-black mt-2 text-center line-clamp-1">{topThree[0].name}</h3>
              <p className="text-4xl font-black mt-1">{Number(topThree[0].avgScore).toFixed(1)}</p>
            </div>
          )}

          {/* Rank 3 */}
          {topThree[2] && (
            <div className={`order-3 md:order-3 flex flex-col items-center p-6 bg-gradient-to-b rounded-3xl w-full md:w-56 shadow-xl border border-white/20 text-white ${getRankStyle(3)}`}>
              <Award size={40} className="mb-2" />
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">3rd Place</p>
              <h3 className="text-xl font-bold mt-2 text-center line-clamp-1">{topThree[2].name}</h3>
              <p className="text-2xl font-black mt-1">{Number(topThree[2].avgScore).toFixed(1)}</p>
            </div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <table className="min-w-full">
          <thead>
            <tr className="bg-green-900/5 text-green-900">
              <th className="px-8 py-6 text-left text-xs font-bold uppercase tracking-widest">Rank</th>
              <th className="px-8 py-6 text-left text-xs font-bold uppercase tracking-widest">User Profile</th>
              <th className="px-8 py-6 text-center text-xs font-bold uppercase tracking-widest">Quiz Attempted</th>
              <th className="px-8 py-6 text-right text-xs font-bold uppercase tracking-widest">Average Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-20 animate-pulse text-gray-400">Loading champions...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-20 text-gray-400">Belum ada data kompetisi.</td></tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.userId} className="hover:bg-green-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                        index + 1 === 1 ? 'bg-yellow-400 text-yellow-900' :
                        index + 1 === 2 ? 'bg-gray-300 text-gray-700' :
                        index + 1 === 3 ? 'bg-orange-400 text-orange-900' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-900/10 flex items-center justify-center text-green-900">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail size={12} /> {item.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-gray-900 font-bold">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                      <Target size={14} className="text-green-600" />
                      {item.attempt} <span className="text-[10px] text-gray-400 font-normal">Times</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-lg font-black text-green-700">{Number(item.avgScore).toFixed(1)}</span>
                      <div className="w-32 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full shadow-[0_0_8px_#22c55e]"
                          style={{ width: `${Math.min(item.avgScore, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center gap-2 text-white/70 text-sm italic justify-center">
        <Star size={16} className="fill-white/70" />
        Sistem penilaian: Diprioritaskan berdasarkan jumlah kuis yang diselesaikan, kemudian skor rata-rata tertinggi.
      </div>
    </div>
  );
}