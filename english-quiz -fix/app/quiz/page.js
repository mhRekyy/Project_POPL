"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";

export default function QuizIndex() {
  const { data: session, status } = useSession();
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) setShowLoginPopup(true);
    else setShowLoginPopup(false);

    const saved = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
    setUnlockedLevel(saved);
  }, [session, status]);

  const levels = [
    { id: 1, name: "Level 1 - Beginner" },
    { id: 2, name: "Level 2 - Intermediate" },
    { id: 3, name: "Level 3 - Advance" },
    { id: 4, name: "Level 4 - Expert" },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  // warna untuk kata setelah '-' per level
  const secondPartColor = {
    1: "#0b0b0b", 
    2: "#0b0b0b", 
    3: "#00c968", 
    4: "#00c968", 
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(0,255,175,0.12), transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,120,80,0.10), transparent 50%), linear-gradient(160deg, #00c968 0%, #054e34 50%, #02150f 100%)",
      }}
    >
      <Navbar />

      {/* POPUP LOGIN */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-center px-6">
          <div className="w-16 h-16 mb-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.4}
                d="M12 11c-1.105 0-2 .895-2 2v3a2 2 0 104 0v-3c0-1.105-.895-2-2-2zm6 2v3a6 6 0 11-12 0v-3a6 6 0 1112 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.4}
                d="M15 7a3 3 0 10-6 0v4h6V7z"
              />
            </svg>
          </div>

          <h2 className="p-3 text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Login Required
          </h2>

          <p className="p-3 text-gray-300 max-w-sm mb-8">
            Kamu harus login terlebih dahulu untuk mengerjakan quiz di EngLite.
          </p>

          <Link
            href="/login"
            className="px-7 py-3 bg-green-600 text-white rounded-xl text-lg font-bold hover:bg-green-700 active:scale-95 transition shadow-lg"
          >
            Login Sekarang
          </Link>

          <button
            onClick={() => setShowLoginPopup(false)}
            className="p-3 mt-5 text-gray-300 hover:text-white underline underline-offset-4 transition"
          >
            Kembali
          </button>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-white">
        <h1 className="text-5xl font-extrabold mb-14 text-center leading-tight drop-shadow-lg">
          Pilih tingkat <span className="text-green-500">Kesulitan</span>
          <span className="inline-block ml-3 rotate-[10deg] text-white text-4xl">
            ≺
          </span>
        </h1>

        {/* GRID LEVEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-6">
          {levels.map((lvl) => {
            const locked = lvl.id > unlockedLevel || !session;
            const isActive = lvl.id === 1;

            // split name "Level 1 - Beginner"
            const [leftRaw, rightRaw] = lvl.name.split("-");
            const leftPart = leftRaw ? leftRaw.trim() : lvl.name;
            const rightPart = rightRaw ? rightRaw.trim() : "";

            if (locked) {
              return (
                <div
                  key={lvl.id}
                  className="p-8 rounded-3xl text-center font-semibold cursor-not-allowed
                             bg-transparent border border-[rgba(255,255,255,0.12)] text-[#8FA7A0] backdrop-blur-md"
                  style={{
                    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                  }}
                >
                  <div className="text-lg">
                    <span className="text-[#D6E1DA]">{leftPart}</span>
                    {rightPart ? (
                      <span className="ml-2 text-[#8FA7A0]">{rightPart}</span>
                    ) : null}
                    <span className="ml-3">🔒</span>
                  </div>
                </div>
              );
            }

            // unlocked clickable container -- transparent + stroke + bubble shadow + blur
            const containerStyle = {
              background: "transparent",
              border: isActive
                ? "2px solid rgba(0,255,175,0.28)"
                : "2px solid rgba(255,255,255,0.18)",
              boxShadow: isActive
                ? "0 18px 40px rgba(0,255,175,0.18), inset 0 1px 0 rgba(255,255,255,0.02)"
                : "0 14px 30px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.02)",
              WebkitBackdropFilter: "blur(6px) glass-card",
              backdropFilter: "blur(8px) glass-card",
            };

            return (
              <Link
                key={lvl.id}
                href={`/quiz/level${lvl.id}`}
                className="p-8 rounded-3xl text-center font-bold transition transform hover:scale-[1.05] backdrop-blur-md"
                style={containerStyle}
              >
                <div className="text-lg">
                  {/* leftPart (e.g. "Level 1") always white */}
                  <span
                    className="text-white"
                    style={{
                      textShadow: "0 2px 0 rgba(0,0,0,0.35)",
                      fontWeight: 800,
                    }}
                  >
                    {leftPart}
                  </span>

                  {/* rightPart (after '-') colored per mapping */}
                  {rightPart ? (
                    <span
                      className="ml-2"
                      style={{
                        color: secondPartColor[lvl.id] || "#9CD7C2",
                        textShadow: "0 1px 0 rgba(0,0,0,0.25)",
                        fontWeight: 700,
                      }}
                    >
                      {rightPart}
                    </span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="relative z-10 text-white py-6 text-center opacity-80">
        <p className="text-sm">© {new Date().getFullYear()} EngLite. All rights reserved.</p>
      </footer>
    </div>
  );
}
