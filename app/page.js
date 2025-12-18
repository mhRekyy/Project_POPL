"use client";

import Image from "next/image";
import objek from "../public/objek.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

      {/* WHITE CAPSULE */}
      <div
        className="
          relative w-full bg-white
          rounded-b-[200px]
          shadow-[0_25px_40px_rgba(0,0,0,0.50)]
          h-[600px]
          overflow-visible
          pt-20
        "
      >
        {/* GREEN BLUR CIRCLE */}
        <div
          className="
            absolute
            left-[30px]    
            top-[30px]
            w-[70px]
            h-[70px]
            rounded-full
            blur-[25px]
            opacity-80
            bg-[#00A76F]
            z-[1]
          "
        ></div>

        <div className="relative w-fit mx-auto">
          <h1
            className="
              p-6
              -mt-2
              text-center font-bold
              text-[72px] leading-[0.9]
              text-[#111]
            "
            style={{
              textShadow: `2px 3px 0 rgba(0,0,0,0.15)`,
            }}
          >
            Welcome to{" "}
            <span
              style={{
                color: "#00A76F",
                textShadow: `2px 3px 0 rgba(0,0,0,0.15)`,
              }}
            >
              Englite!
            </span>
          </h1>

          {/* QUOTE ICON - RIGHT UNDER H1 */}
          <img
            src="/tanda petik.png"  
            alt=""
            className="w-10 h-10 absolute -bottom-1 -right-2 opacity-90 rotate-[150deg]"
          />
        </div>

        {/* HERO */}
        <div
          className="
            relative w-full max-w-[1440px] mx-auto
            px-14
            flex flex-col md:flex-row
            items-center justify-between
            mt-2
          "
        >

          {/* LEFT TEXT */}
          <div className="hidden md:flex w-1/3 -mt-40">
            <div className="max-w-[320px] relative">

              {/* QUOTE ICON */}
              <img 
                src="/tanda petik.png" 
                alt=""
                className="w-10 h-10 absolute -top-5 -left-8"
              />

              <p className="text-[16px] font-medium text-[#222] leading-[1.25] mt-4">
                 &quot;Asah kemampuan English-mu dengan kuis interaktif yang bikin nagih.
                Siap-siap, skill kamu bakal naik level! baru 1% orang yang bisa
                 menyelesaikannya loh&quot;
              </p>
            </div>
          </div>

          {/* CHARACTER */}
          <div className="relative flex flex-col items-center w-full md:w-1/3 mt-1">

            {/* CIRCLE BEHIND */}
            <div
              className="
                absolute
                w-[320px]
                h-[320px]
                bg-[#e6e6e6]
                rounded-full
                top-[30px]
                z-10
              "
            />

            {/* IMAGE */}
            <Image
              src={objek}
              alt="Character"
              width={500}
              height={500}
              className="
                relative z-20
                drop-shadow-[0_28px_40px_rgba(0,0,0,0.28)]
                translate-y-[-39px]
              "
            />

          {/* AYOK LOGIN + ARROW */}
          {!session && (
            <div
              className="
                absolute
                bottom-[-20px] 
                left-1/2
                -translate-x-[260px] 
                flex flex-col items-start
                z-40
              "
            >
              <span className="text-[15px] text-[#6a6a6a] italic opacity-90 -mb-[25px] -ml-4">
                &ldquo;Ayok login…&rdquo;
              </span>

              <img
                src="/arrow.png"
                alt="arrow"
                className="
                  w-[200px]
                  h-auto
                  -rotate-6
                  -mt-1
                  ml-1
                  pointer-events-none 
                  select-none
                "
                draggable="false"
              />
            </div>
          )}


          {/* BUTTON WRAPPER */}
          <div
            className="
              absolute bottom-[60px]
              left-1/2 -translate-x-1/2
              flex items-center gap-[8px]
              px-[5px] py-[5px]
              rounded-full
              bg-white/15
              backdrop-blur-xl
              border border-white/50
              shadow-[0_4px_18px_rgba(0,0,0,0.25)]
              z-50
            "
          >

            {/* LOGIN BUTTON */}
            {!session && (
              <button
                onClick={() => router.push('/login')}
                className="
                  px-[24px] py-[8px]
                  text-[16px] font-bold
                  rounded-full
                  bg-gradient-to-b from-[#02905B] to-[#00A86B]
                  text-white tracking-wide
                  shadow-[0_4px_0_rgba(0,0,0,0.28)]
                  leading-none
                  hover:brightness-110 transition
                "
              >
                LOGIN
              </button>
            )}

            {/* MULAI QUIZ BUTTON */}
            <button
              onClick={() => router.push('/quiz')}
              className="
                px-[20px] py-[10px]
                text-[10px] font-semibold
                rounded-full
                border border-white/80
                bg-transparent
                text-white tracking-wide
                leading-none
                shadow-[0_2px_6px_rgba(0,0,0,0.15)]
                hover:bg-white/15 transition
              "
            >
              MULAI QUIZ
            </button>

          </div>

          </div>


          {/* RIGHT RATING */}
          <div className="hidden md:flex w-1/3 justify-end pr-[26px] -mt-40">
            <div className="text-right">
              <div className="flex justify-end -mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#00A76F] text-[32px] font-extrabold">
                    ★
                  </span>
                ))}
              </div>
              <div className="text-[36px] font-bold text-[#111]">Super</div>
              <div className="text-[18px] text-gray-600 mt-[-4px]">Experience</div>
            </div>
          </div>
        </div>
      </div>

        {/* STATS CARD*/}
        <div className="pt-16 pb-20 -mt-8">
          <div className="max-w-[1000px] mx-auto px-10">
            <div
              className="
                bg-gradient-to-br from-[#0C5A3D] to-[#063828]
                border border-white/100
                rounded-[30px]
                py-4 px-8
                backdrop-blur-[2px]
                shadow-[0_12px_40px_rgba(0,0,0,0.40)]
                scale-[0.90]
                glassmorphism     
                mx-auto
              "
            >
              <div className="grid grid-cols-4 text-white text-center gap-4">
                <div>
                  <div className="text-[32px] font-extrabold">
                    1000<span className="text-emerald-300">+</span>
                  </div>
                  <div className="text-[12px] opacity-80">PENGUNJUNG</div>
                </div>
                <div>
                  <div className="text-[32px] font-extrabold">
                    800<span className="text-emerald-300">+</span>
                  </div>
                  <div className="text-[12px] opacity-80">PENGGUNA</div>
                </div>
                <div>
                  <div className="text-[32px] font-extrabold">
                    3200<span className="text-emerald-300">+</span>
                  </div>
                  <div className="text-[12px] opacity-80">TOTAL SUBMIT</div>
                </div>
                <div>
                  <div
                    className="
                      flex justify-center
                      text-[32px]
                      font-extrabold
                      bg-gradient-to-br from-[#2aff9c] to-[#0b8a5b]
                      text-transparent bg-clip-text
                    "
                  >
                    ★★★★★
                  </div>
                  <div className="text-[12px] opacity-80">RATING</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section
        id="about"
        className="relative z-10 bg-white py-20 px-6 md:px-20 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-700 mb-12">Tentang EngLite</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            EngLite adalah platform pembelajaran bahasa Inggris interaktif yang
            membantu kamu meningkatkan kemampuan bahasa Inggris dengan cara yang
            menyenangkan. Dari level dasar hingga expert, kami menyediakan soal
            latihan, kuis, dan pembelajaran berbasis praktik yang bisa diakses kapan saja.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            EngLite hadir dengan <span className="font-semibold">4 level pembelajaran</span> yang
            dirancang khusus untuk menemani perjalananmu belajar bahasa Inggris. Mulai dari
            pemula hingga ahli, semua bisa berkembang sesuai kemampuan. 🌟
          </p>

          {/* Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Level 1 */}
            <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Level 1</h3>
              <p className="text-yellow-500 text-lg mb-4">Beginner 🐣</p>
              <p className="text-gray-600">
                Cocok untuk pemula. Belajar dasar kosakata, tata bahasa sederhana, dan
                percakapan ringan sehari-hari.
              </p>
            </div>

            {/* Level 2 */}
            <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Level 2</h3>
              <p className="text-yellow-500 text-lg mb-4">Intermediate 📘</p>
              <p className="text-gray-600">
                Untuk yang sudah mengenal dasar. Fokus pada percakapan lebih kompleks
                dan penguasaan tata bahasa menengah.
              </p>
            </div>

            {/* Level 3 */}
            <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Level 3</h3>
              <p className="text-yellow-500 text-lg mb-4">Advanced 🚀</p>
              <p className="text-gray-600">
                Tingkat lanjut. Latihan memahami teks panjang, ekspresi idiomatik, serta
                komunikasi profesional.
              </p>
            </div>

            {/* Level 4 */}
            <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Level 4</h3>
              <p className="text-yellow-500 text-lg mb-4">Expert 🏆</p>
              <p className="text-gray-600">
                Level tertinggi! Tantangan dengan soal akademis, debat, dan kemampuan
                menulis serta berbicara layaknya seorang expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-green-900 text-white py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EngLite. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
