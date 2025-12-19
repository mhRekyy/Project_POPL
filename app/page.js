"use client";

import Image from "next/image";
import objek from "../public/objek.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Opsional: Import icon dari library seperti lucide-react jika Anda menggunakannya
// import { BookOpen, GraduationCap, Award, Rocket } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-x-hidden"
    style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(0,255,175,0.12), transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,120,80,0.10), transparent 50%), linear-gradient(160deg, #00c968 0%, #054e34 50%, #02150f 100%)",
        backgroundAttachment: "fixed"
      }}
    >

      {/* soft decorative blur left */}
      <div className="pointer-events-none absolute left-8 top-28 w-36 h-36 bg-emerald-300 rounded-full filter blur-3xl opacity-40 z-0"></div>

      {/* ======================= landing section ======================= */}
      <section className="relative w-full h-screen flex flex-col">
          {/* ... (BAGIAN INI TIDAK DIUBAH SESUAI PERMINTAAN) ... */}
          <div className="relative w-full bg-white rounded-b-[200px] shadow-[0_25px_40px_rgba(0,0,0,0.50)] h-[600px] overflow-visible pt-20">
            <div className="absolute left-[30px] top-[30px] w-[70px] h-[70px] rounded-full blur-[25px] opacity-80 bg-[#00A76F] z-[1]"></div>
            <div className="relative w-fit mx-auto">
                <h1 className="p-6 -mt-2 text-center font-bold text-[72px] leading-[0.9] text-[#111]" style={{ textShadow: `2px 3px 0 rgba(0,0,0,0.15)` }}>
                    Welcome to <span style={{ color: "#00A76F", textShadow: `2px 3px 0 rgba(0,0,0,0.15)` }}>Englite!</span>
                </h1>
                <Image src="/tanda petik.png" alt="" width={40} height={40} className="w-10 h-10 absolute -bottom-1 -right-2 opacity-90 rotate-[150deg]" />
            </div>

            <div className="relative w-full max-w-[1440px] mx-auto px-14 flex flex-col md:flex-row items-center justify-between mt-2">
                <div className="hidden md:flex w-1/3 -mt-40">
                    <div className="max-w-[320px] relative">
                        <Image src="/tanda petik.png" alt="" width={40} height={40} className="w-10 h-10 absolute -top-5 -left-8" />
                        <p className="text-[16px] font-medium text-[#222] leading-[1.25] mt-4">
                            &quot;Asah kemampuan English-mu dengan kuis interaktif yang bikin nagih. Siap-siap, skill kamu bakal naik level! baru 1% orang yang bisa menyelesaikannya loh&quot;
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center w-full md:w-1/3 mt-1">
                    <div className="absolute w-[320px] h-[320px] bg-[#e6e6e6] rounded-full top-[30px] z-10" />
                    <Image src={objek} alt="Character" width={500} height={500} className="relative z-20 drop-shadow-[0_28px_40px_rgba(0,0,0,0.28)] translate-y-[-39px]" />
                    {!session && (
                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-[260px] flex flex-col items-start z-40">
                            <span className="text-[15px] text-[#6a6a6a] italic opacity-90 -mb-[25px] -ml-4">&ldquo;Ayok login&hellip;&rdquo;</span>
                            <Image src="/arrow.png" alt="arrow" width={200} height={100} className="w-[200px] h-auto -rotate-6 -mt-1 ml-1 pointer-events-none select-none" draggable="false" />
                        </div>
                    )}
                    <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] px-[5px] py-[5px] rounded-full bg-white/15 backdrop-blur-xl border border-white/50 shadow-[0_4px_18px_rgba(0,0,0,0.25)] z-50">
                        {!session && (
                            <button onClick={() => router.push('/login')} className="px-[24px] py-[8px] text-[16px] font-bold rounded-full bg-gradient-to-b from-[#02905B] to-[#00A86B] text-white tracking-wide shadow-[0_4px_0_rgba(0,0,0,0.28)] hover:brightness-110 transition leading-none">LOGIN</button>
                        )}
                        <button onClick={() => router.push('/quiz')} className="px-[20px] py-[10px] text-[10px] font-semibold rounded-full border border-white/80 bg-transparent text-white tracking-wide leading-none shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:bg-white/15 transition">MULAI QUIZ</button>
                    </div>
                </div>

                <div className="hidden md:flex w-1/3 justify-end pr-[26px] -mt-40">
                    <div className="text-right">
                        <div className="flex justify-end -mb-4">
                            {[...Array(5)].map((_, i) => (<span key={i} className="text-[#00A76F] text-[32px] font-extrabold">★</span>))}
                        </div>
                        <div className="text-[36px] font-bold text-[#111]">Super</div>
                        <div className="text-[18px] text-gray-600 mt-[-4px]">Experience</div>
                    </div>
                </div>
            </div>
          </div>

          <div className="pt-16 pb-20 -mt-8">
            <div className="max-w-[1000px] mx-auto px-10">
              <div className="bg-gradient-to-br from-[#0C5A3D] to-[#063828] border border-white/100 rounded-[30px] py-4 px-8 backdrop-blur-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.40)] scale-[0.90] glassmorphism mx-auto">
                <div className="grid grid-cols-4 text-white text-center gap-4">
                  <div><div className="text-[32px] font-extrabold">1000<span className="text-emerald-300">+</span></div><div className="text-[12px] opacity-80">PENGUNJUNG</div></div>
                  <div><div className="text-[32px] font-extrabold">800<span className="text-emerald-300">+</span></div><div className="text-[12px] opacity-80">PENGGUNA</div></div>
                  <div><div className="text-[32px] font-extrabold">3200<span className="text-emerald-300">+</span></div><div className="text-[12px] opacity-80">TOTAL SUBMIT</div></div>
                  <div><div className="flex justify-center text-[32px] font-extrabold bg-gradient-to-br from-[#2aff9c] to-[#0b8a5b] text-transparent bg-clip-text">★★★★★</div><div className="text-[12px] opacity-80">RATING</div></div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* ======================= ENHANCED ABOUT SECTION ======================= */}
      <section
        id="about"
        className="relative z-10 py-32 px-6 md:px-20 overflow-hidden"
      >
        {/* Decorative Background Elements for About */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/95 -z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[100px] md:rounded-t-[200px]"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Header Title with Modern Accent */}
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[#111] mb-4 tracking-tight">
              Tentang <span className="text-[#00A76F]">EngLite</span>
            </h2>
            <div className="h-2 w-24 bg-[#00A76F] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Image/Visual */}
            <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-[#00A76F]/10 rounded-[40px] blur-2xl rotate-3"></div>
                <div className="relative bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100">
                    <div className="bg-[#00A76F]/5 rounded-[30px] p-8 md:p-12">
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed italic">
                            &quot;Belajar bahasa Inggris tidak pernah <span className="text-[#00A76F]">semudah</span> dan <span className="text-[#00A76F]">semudah</span> ini sebelumnya.&quot;
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-1 w-12 bg-[#00A76F]"></div>
                            <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Englite Vision</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Text Content */}
            <div className="text-left order-1 lg:order-2">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    EngLite adalah platform pembelajaran bahasa Inggris interaktif yang
                    membantu kamu meningkatkan kemampuan bahasa Inggris dengan cara yang
                    menyenangkan.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                    Kami membuang cara lama yang membosankan dan menggantinya dengan <span className="font-bold text-[#00A76F]">kuis berbasis praktik</span> yang dirancang khusus untuk menemani perjalananmu dari nol hingga mahir.
                </p>
                
                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#00A76F] group-hover:bg-[#00A76F] group-hover:text-white transition-all">
                            🌟
                        </div>
                        <span className="font-bold text-gray-700">Interaktif & Fun</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#00A76F] group-hover:bg-[#00A76F] group-hover:text-white transition-all">
                            🎯
                        </div>
                        <span className="font-bold text-gray-700">Terfokus & Praktis</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Enhanced Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Level 1 */}
            <div className="group bg-white p-8 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,167,111,0.2)] transition-all duration-500 border border-gray-100 hover:-translate-y-4">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🐣</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Level 1</h3>
              <p className="text-[#00A76F] font-bold text-sm mb-4 uppercase tracking-tighter">Beginner Stage</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Belajar dasar kosakata, tata bahasa sederhana, dan percakapan ringan sehari-hari.
              </p>
            </div>

            {/* Level 2 */}
            <div className="group bg-white p-8 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,167,111,0.2)] transition-all duration-500 border border-gray-100 hover:-translate-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📘</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Level 2</h3>
              <p className="text-[#00A76F] font-bold text-sm mb-4 uppercase tracking-tighter">Intermediate Stage</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fokus pada percakapan lebih kompleks dan penguasaan tata bahasa menengah.
              </p>
            </div>

            {/* Level 3 */}
            <div className="group bg-white p-8 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,167,111,0.2)] transition-all duration-500 border border-gray-100 hover:-translate-y-4">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Level 3</h3>
              <p className="text-[#00A76F] font-bold text-sm mb-4 uppercase tracking-tighter">Advanced Stage</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Latihan memahami teks panjang, ekspresi idiomatik, dan komunikasi profesional.
              </p>
            </div>

            {/* Level 4 */}
            <div className="group bg-white p-8 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,167,111,0.2)] transition-all duration-500 border border-gray-100 hover:-translate-y-4">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Level 4</h3>
              <p className="text-[#00A76F] font-bold text-sm mb-4 uppercase tracking-tighter">Expert Stage</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tantangan soal akademis, debat, dan kemampuan berbicara layaknya expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-green-900 text-white py-12 text-center border-t border-white/10">
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-black tracking-tighter italic text-emerald-400">ENGLITE</h2>
            <p className="text-sm opacity-60">
                &copy; {new Date().getFullYear()} EngLite. All rights reserved.
            </p>
        </div>
      </footer>
    </main>
  );
}