"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

import { Separator } from "@/components/ui/separator";

// =====================================
// PROFILE PAGE (PIXEL-REFINED)
// =====================================

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/quiz-result?userId=${session.user.id}`);
        const data = await res.json();
        setHistory(Array.isArray(data.data) ? data.data : []);
      } catch {
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    }
    loadHistory();
  }, [session]);

  // LOADING
  if (status === "loading" || loadingHistory) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-white">
        Loading...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-6 text-center text-white">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Anda belum login</h1>
        <p className="text-gray-600 mb-6">Silakan login untuk melihat profil.</p>

        <Link
          href="/login"
          className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700"
        >
          Login Sekarang
        </Link>
      </div>
    );
  }

  // STATS
  const totalQuiz = history.length;
  const avgAccuracy =
    totalQuiz > 0
      ? Math.round(history.reduce((acc, h) => acc + (h.score || 0), 0) / totalQuiz)
      : 0;

  const passedCount = history.filter((h) => h.passed).length;
  const failedCount = history.filter((h) => !h.passed).length;

  // image path
  const imageSrc = "/objek2.png";

  return (
    <div
      className="h-screen overflow-y-hidden pt-20 pb-16 px-8 text-white"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(0,255,175,0.12), transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,120,80,0.10), transparent 50%), linear-gradient(160deg, #00c968 0%, #054e34 50%, #02150f 100%)",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT MAIN (WELCOME + MOTIVATION + STATS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Welcome + date */}
            <div className="px-6">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                Welcome <span className="text-white"> {session.user.name?.split(" ")[0] || "User"}!</span>
              </h1>
              <div className="mt-3 text-sm text-emerald-100/70 font-medium">
                {new Date().toLocaleDateString("id-ID")}
              </div>
            </div>

             {/* Motivational Card (compact horizontal) */}
            <div className="relative px-6">
              <div
                className="relative rounded-2xl px-10 py-6 overflow-visible shadow-2xl glass-card flex items-center"
                style={{ minHeight: "140px" }}
              >
                {/* TEXT */}
                <div className="flex-1 pr-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-50 mb-2">
                    Good Job!
                  </h2>

                  <p className="text-emerald-100/80 text-base leading-relaxed max-w-2xl">
                    You’ve put in so much effort, and completing this task shows
                    your strength and dedication. Be proud of your progress—every
                    achievement, no matter the size, brings you closer to who
                    you’re becoming.
                  </p>
                </div>
                {/* container for image purposely small */}
                <div style={{ width: 200, height: 120 }} aria-hidden />
              </div>

              {/* IMAGE */}
              <div
                className="absolute pointer-events-none"
                style={{
                  right: -60,
                  top: -60,
                  width: 360,
                  height: 260,
                  zIndex: 30,
                }}
              >
                <Image
                  src={imageSrc}
                  alt="Ilustrasi motivasi"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* Statistik header */}
            <div className="px-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-emerald-100">Statistik</h3>
                <div className="flex-1 h-[2px] bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Stat cards */}
            <div className="px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard value={totalQuiz} label="Total Quiz" />
                <StatCard value={`${avgAccuracy}%`} label="Akurasi" />
                <StatCard value={passedCount} label="Total Lulus" />
                <StatCard value={failedCount} label="Tidak Lulus" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (PROFILE + HISTORY) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20">
              <div
                className="rounded-2xl p-6 border shadow-xl glass-card"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >

                {/* avatar + info */}
                <div className="flex items-center gap-4">
                  <div
                    className="h-24 w-24 rounded-full flex items-center justify-center text-4xl font-extrabold"
                    style={{
                      background: "linear-gradient(180deg,#00cf88,#0ba06a)",
                      color: "#fff",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                    }}
                  >
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-emerald-200/80">Nama Lengkap</p>
                    <h4 className="text-2xl font-extrabold text-white truncate">
                      {session.user.name}
                    </h4>
                    <p className="text-sm text-emerald-200/70 mt-1 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Separator className="my-6 bg-white/10" />

                {/* Riwayat */}
                <h5 className="text-lg font-bold text-emerald-100 mb-4">Riwayat Quiz</h5>

                {/* AREA SCROLLABLE */}
                <div
                  className="space-y-4 pr-2 custom-scroll overflow-y-auto"
                  style={{  
                    maxHeight: "50vh", 
                  }}
                >
                
                  {history.length === 0 ? (
                    <div className="text-emerald-200/70 text-sm">
                      Belum ada riwayat kuis.
                    </div>
                  ) : (
                    history.map((h, i) => <HistoryItem key={i} item={h} />)
                  )}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(125, 221, 148, 0.6);
          border-radius: 999px;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(125, 221, 148, 0.6) transparent;
        }
      `}</style>
    </div>
  );
}

// ===============================
// COMPONENT: Stat Card (glass + hover scale)
// ===============================
function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl p-6 text-center transition-transform transform hover:scale-105 glass-card shadow-lg">
      <div className="text-3xl md:text-4xl font-extrabold text-white">{value}</div>
      <div className="mt-2 text-sm text-emerald-200/90">{label}</div>
    </div>
  );
}

// ===============================
// COMPONENT: History Item (single white card, no double wrapper)
// ===============================
function HistoryItem({ item }) {
  const score = item?.score ?? 0;
  const passed = !!item?.passed;
  const date = item?.createdAt ? new Date(item.createdAt) : new Date();

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-800">Quiz {item.level ?? 1}</div>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            <Calendar size={14} />
            <span>{date.toLocaleDateString("id-ID")}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-extrabold text-gray-800">{score}%</div>
          <div className="text-xs mt-1 inline-flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                passed ? "bg-emerald-100/80 text-emerald-800" : "bg-red-100/80 text-red-700"
              }`}
            >
              {passed ? "Lulus" : "Tidak Lulus"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(100, Math.max(0, score))}%`,
            background: "linear-gradient(90deg,#7bd88c,#2db86d)",
          }}
        />
      </div>
    </div>
  );
}
