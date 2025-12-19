"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Award, Rocket, Edit3, Settings2 } from "lucide-react";

export default function AdminQuiz() {
  const levels = [
    { 
      id: 1, 
      desc: "Level dasar — kosakata & tata bahasa sederhana.", 
      icon: <BookOpen size={32} />,
      color: "from-blue-500 to-blue-700"
    },
    { 
      id: 2, 
      desc: "Grammar & percakapan tingkat menengah.", 
      icon: <GraduationCap size={32} />,
      color: "from-green-500 to-green-700"
    },
    { 
      id: 3, 
      desc: "Pemahaman teks panjang & komunikasi profesional.", 
      icon: <Award size={32} />,
      color: "from-purple-500 to-purple-700"
    },
    { 
      id: 4, 
      desc: "Materi akademik & kemampuan expert.", 
      icon: <Rocket size={32} />,
      color: "from-red-500 to-red-700"
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-extrabold text-white flex items-center gap-4 tracking-tight">
            <Settings2 size={48} className="text-white" />
            Quiz Management
          </h1>
          <p className="text-green-100 text-lg mt-2 font-medium">
            Kelola kurikulum dan soal latihan untuk setiap tingkatan kemahiran.
          </p>
        </div>
      </div>

      {/* Grid Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {levels.map((lvl) => (
          <Link
            key={lvl.id}
            href={`/admin/quiz/level/${lvl.id}`}
            className="group relative overflow-hidden bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 shadow-2xl border border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-green-900/20"
          >
            {/* Background Accent Decor */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${lvl.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex flex-col gap-4">
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-white shadow-lg`}>
                  {lvl.icon}
                </div>
                
                <div>
                  <h2 className="text-3xl font-black text-green-900 mb-2">
                    Level {lvl.id}
                  </h2>
                  <p className="text-gray-500 text-md leading-relaxed max-w-xs font-medium italic">
                    "{lvl.desc}"
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full">
                <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Static JSON Mode
                </span>
                
                <div className="mt-12 flex items-center gap-2 text-green-600 font-black group-hover:gap-4 transition-all uppercase text-sm tracking-tighter">
                  <Edit3 size={18} />
                  Edit Question Content
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            {/* Bottom Progress Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100">
              <div className={`h-full bg-gradient-to-r ${lvl.color} w-0 group-hover:w-full transition-all duration-500`} />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10 max-w-2xl mx-auto">
        <p className="text-white/80 text-sm font-medium">
          💡 <b>Info Pengembang:</b> Perubahan soal akan disimpan langsung ke dalam file JSON lokal di direktori <code className="bg-black/20 px-2 py-1 rounded text-green-300">/data/quiz-level-x.json</code>.
        </p>
      </div>
    </div>
  );
}