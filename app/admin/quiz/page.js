"use client";

import Link from "next/link";

export default function AdminQuiz() {
  const levels = [
    { id: 1, desc: "Level dasar — kosakata & tata bahasa sederhana." },
    { id: 2, desc: "Grammar & percakapan tingkat menengah." },
    { id: 3, desc: "Pemahaman teks panjang & komunikasi profesional." },
    { id: 4, desc: "Materi akademik & kemampuan expert." },
  ];

  return (
    <div className="p-6">
      {/* Judul halaman */}
      <h1 className="text-5xl font-bold text-green-700 mb-20">
        Admin Quiz Panel
      </h1>
      <p className="text-xl text-gray-800 mb-8">
        Kelola soal latihan untuk berbagai tingkat pembelajaran. Pilih level untuk melakukan pengeditan.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((lvl) => (
          <Link
            key={lvl.id}
            href={`/admin/quiz/level/${lvl.id}`}
            className="
              bg-white border rounded-2xl shadow-sm
              p-7 flex flex-col justify-center
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-200
            "
          >
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Level {lvl.id}
            </h2>
            <p className="text-gray-600 text-md mb-4">{lvl.desc}</p>
            <span className="text-green-600 font-semibold">
              Edit Soal →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
