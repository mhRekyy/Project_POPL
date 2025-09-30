// app/quiz/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar"; // pastikan path sesuai struktur

export default function QuizIndex() {
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
    setUnlockedLevel(saved);
  }, []);

  const levels = [
    { id: 1, name: "Level 1 - Beginner" },
    { id: 2, name: "Level 2 - Intermediate" },
    { id: 3, name: "Level 3 - Advanced" },
    { id: 4, name: "Level 4 - Expert" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
          Pilih Tingkat Kesulitan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {levels.map((lvl) => {
            const locked = lvl.id > unlockedLevel;
            return locked ? (
              <div
                key={lvl.id}
                className="p-6 bg-gray-200/70 text-gray-500 rounded-2xl shadow-md text-center font-semibold cursor-not-allowed border border-gray-300"
              >
                {lvl.name} 🔒
              </div>
            ) : (
              <Link
                key={lvl.id}
                href={`/quiz/level${lvl.id}`}
                className="p-6 bg-green-600 text-white rounded-2xl shadow-lg text-center font-semibold hover:bg-green-700 transition transform hover:scale-105"
              >
                {lvl.name}
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-green-700 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} EngLite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
