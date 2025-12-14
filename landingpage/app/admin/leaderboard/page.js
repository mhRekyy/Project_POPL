"use client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);

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
      });
  }, []);

  const rankBadge = (rank) => {
    if (rank === 1) return "bg-yellow-400 text-black";
    if (rank === 2) return "bg-gray-300 text-black";
    if (rank === 3) return "bg-orange-400 text-black";
    return "bg-green-100 text-green-800";
  };

  // 🔥 Ikon untuk 3 besar
  const rankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-20">Leaderboard 🏆</h1>
      <p className="text-xl text-gray-800 mt-1 mb-8 text-lg">
        Urutan ranking berdasarkan jumlah kuis terbanyak & rata-rata skor tertinggi.
      </p>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white text-center">
            <tr>
              <th className="p-4 font-semibold">Rank</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Total Quiz</th>
              <th className="p-4 font-semibold">Avg Score</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Belum ada data leaderboard.
                </td>
              </tr>
            )}

            {data.map((item, index) => {
              const rank = index + 1;
              return (
                <tr
                  key={item.userId}
                  className="border-b odd:bg-green-50 even:bg-white hover:bg-green-100 transition"
                >
                  <td className="p-4 text-center">
                    {rankIcon(rank) ? (
                      <span className="text-3xl">{rankIcon(rank)}</span> // 🔥 Rank 1–3 → ikon saja
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${rankBadge(rank)}`}
                      >
                        {rank}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center font-medium text-gray-900">{item.name}</td>
                  <td className="p-4 text-center text-gray-700">{item.email}</td>
                  <td className="p-4 text-center font-semibold text-gray-900">
                    {item.attempt}
                  </td>
                  <td className="p-4 text-center font-bold text-green-700">
                    {Number(item.avgScore).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-green-900 font-medium">
        ⚖ Sistem penilaian: <b>Total Quiz terbanyak</b> → <b>Avg Score tertinggi</b>.
      </p>
    </div>
  );
}
