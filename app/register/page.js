"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } else {
      alert(data.error || "Terjadi kesalahan!");
    }
  };

  const fullBg =
    "radial-gradient(circle at 12% 18%, rgba(0,255,175,0.12), transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,120,80,0.10), transparent 50%), linear-gradient(160deg, #00c968 0%, #054e34 50%, #02150f 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
    <div
      className="w-full min-h-screen relative overflow-hidden"
      style={{ background: fullBg }}
    >

      {/* === IMAGE (MIRROR: KANAN) === */}
      <div className="absolute -right-15 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center z-20">
        <img
          src="/objek3.png"
          alt="Objek Register"
          className="w-[80%] select-none drop-shadow-xl mt-65"
        />
      </div>

      {/* === GREEN BLUR (MIRROR → KANAN) === */}
      <div
        className="
          absolute right-10 top-30
          w-[70px] h-[70px]
          rounded-full blur-[25px]
          opacity-80 bg-[#00A76F] z-20
        "
      />

      {/* === BUBBLE MIRROR — SEKARANG DI KIRI + ROTASI DIBALIK === */}
      <div className="absolute left-[700px] top-[20px] z-[40] pointer-events-none rotate-[-45deg]">
        <svg width="220" height="300" viewBox="0 0 220 300">
          <defs>
            <filter 
              id="bubbleShadowRegM"
              x="-200" 
              y="-200" 
              width="800" 
              height="800"
              filterUnits="userSpaceOnUse"
            >
              <feOffset in="SourceAlpha" dx="-15" dy="0" result="offset" />
              <feGaussianBlur in="offset" stdDeviation="25" result="blur" />
              <feFlood floodColor="rgba(0,0,0,0.90)" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />

              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="
              M100 10
              C110 60 120 130 125 190
              C130 240 70 240 80 190
              C90 110 100 40 100 10
              Z
            "
            fill="white"
            opacity="0.93"
            filter="url(#bubbleShadowRegM)"
          />

          <circle
            cx="80"
            cy="260"
            r="15"
            fill="white"
            opacity="0.93"
            filter="url(#bubbleShadowRegM)"
          />
        </svg>
      </div>

      {/* === FORM REGISTER (NOW ON LEFT SIDE) === */}
      <div className="absolute left-60 top-1/2 -translate-y-1/2 z-[30]">
        <div className="w-[360px] px-2">

          <h2 className="text-5xl font-extrabold text-white mb-10 leading-tight">
            Register
          </h2>

          <div className="mb-6">
            <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full h-[42px] px-4
                rounded-full
                bg-[#3c3c3c]
                text-white
                font-semibold
                text-[14px]
                placeholder-[#dcdcdc]
                shadow
                outline-none
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full h-[42px] px-4
                rounded-full
                bg-[#3c3c3c]
                text-white
                font-semibold
                text-[14px]
                placeholder-[#dcdcdc]
                shadow
                outline-none
              "
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
              Password
            </label>
            <input
              type="password"
              placeholder="Buat password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-[42px] px-4
                rounded-full
                bg-[#3c3c3c]
                text-white
                font-semibold
                text-[14px]
                placeholder-[#dcdcdc]
                shadow
                outline-none
              "
            />
          </div>

          <button
            onClick={handleRegister}
            className="
              mt-10
              w-[200px] h-[42px]
              bg-[#00a86b]
              text-white
              rounded-full
              font-bold
              text-[15px]
              shadow
              hover:bg-[#02995f]
              active:scale-95
              transition
              block mx-auto
            "
          >
            REGISTER
          </button>

          <p className="text-center mt-4 text-gray-200 text-[14px]">
            Sudah punya akun?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-green-400 font-semibold cursor-pointer"
            >
              Login disini
            </span>
          </p>
        </div>
      </div>

      {/* === WHITE CURVE SHAPE — MIRROR (DRAG KE KANAN + BALIK ARAH SHAPE) === */}
      <svg
        className="absolute right-0 top-0 h-[160vh] w-[1500px] pointer-events-none z-10"
        viewBox="0 0 2000 2000"
        preserveAspectRatio="none"
        style={{ transform: "translateX(35%) scaleX(-1)" }}
      >
        <defs>
          <filter id="curveShadow2M" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="15"
              stdDeviation="25"
              floodColor="rgba(0,0,0,3.50)"
            />
          </filter>
        </defs>

        <path
          d="
            M1800 0
            C1700 150 1500 250 1500 450
            C1500 650 1800 700 1800 900
            C1800 1100 1600 1200 1500 1500
            L0 1800
            L0 0
            Z
          "
          fill="white"
          filter="url(#curveShadow2M)"
        />
      </svg>
    </div>
    </motion.div>
  );
}
