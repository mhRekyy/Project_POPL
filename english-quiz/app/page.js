"use client";
import Image from "next/image";
import laptopImg from "../public/objek.png";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-100 to-green-300 overflow-hidden">
      {/* ✅ Navbar ditampilkan di sini */}
      <Navbar />

      {/* Background Shape */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-32 w-[500px] h-[500px] bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Landing Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center min-h-screen px-6">
        {/* Illustration on the left */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <Image
            src={laptopImg}
            alt="Belajar Online"
            className="w-[400px] md:w-[550px] drop-shadow-xl"
          />
        </div>

        {/* Text Content on the right */}
        <div className="md:w-1/2 flex flex-col items-start text-center md:text-left">
          <h1 className="text-6xl md:text-7xl font-extrabold text-green-800 leading-tight mb-6">
            Welcome to <span className="text-yellow-500">EngLite!</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-lg">
            Latih kemampuan bahasa Inggris kamu dengan menjawab soal-soal interaktif,
            mulai dari level dasar hingga expert! 🚀
          </p>
          <a
            href="/quiz"
            className="bg-green-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Mulai Quiz
          </a>
        </div>
      </section>

      {/* About Section */}
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
      <footer className="relative z-10 bg-green-700 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} EngLite. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
