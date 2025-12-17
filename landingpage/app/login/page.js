"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (role === "admin") {
      if (email !== "adminenglite@gmail.com" || password !== "admin123") {
        alert("Email atau password admin salah!");
        return;
      }
      router.push("/admin/dashboard");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.error) {
      router.push("/");
    } else {
      alert("Email atau password salah!");
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
        
        {/* IMAGE KIRI */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center z-20">
          <img
            src="/objek3.png"
            alt="Objek Login"
            className="w-[85%] select-none drop-shadow-xl mt-65"
          />
        </div>

        {/* GREEN BLUR */}
        <div
          className="
            absolute
            left-10    
            top-30
            w-[70px]
            h-[70px]
            rounded-full
            blur-[25px]
            opacity-80
            bg-[#00A76F]
            z-20
          "
        ></div>

        {/* BUBBLE */}
        <div className="absolute right-[600px] top-[30px] z-[40] pointer-events-none rotate-[45deg]">
          <svg width="220" height="300" viewBox="0 0 220 300">
            <defs>
              <filter id="bubbleShadow4" x="-25%" y="-25%" width="250%" height="250%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
                <feOffset dx="15" dy="0" result="offsetBlur" />
                <feFlood floodColor="rgba(0,0,0,0.90)" />
                <feComposite in2="offsetBlur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="
                M100 10
                C100 60 110 120 120 190
                C130 240 70 240 75 190
                C80 110 90 40 100 10
                Z
              "
              fill="white"
              opacity="0.93"
              filter="url(#bubbleShadow4)"
            />

            <circle
              cx="120"
              cy="260"
              r="15"
              fill="white"
              opacity="0.93"
              filter="url(#bubbleShadow4)"
            />
          </svg>
        </div>

        {/* FORM LOGIN */}
        <div className="absolute right-50 top-1/2 -translate-y-1/2 z-[30]">
          <div className="w-[360px] px-2">
            <h2 className="text-5xl font-extrabold text-white mb-10 leading-tight">
              Login
            </h2>

            {/* ROLE */}
            <div className="mb-6">
              <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
                Login sebagai
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  w-full h-[42px] px-4 
                  rounded-full 
                  bg-[#3c3c3c] 
                  text-white 
                  font-semibold 
                  text-[14px]
                  shadow 
                  outline-none
                "
              >
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>
            </div>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
                Email
              </label>
              <input
                type="email"
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
                placeholder="Masukkan email..."
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="block text-gray-200 font-semibold mb-2 text-[15px]">
                Password
              </label>
              <input
                type="password"
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
                placeholder="Masukkan password..."
              />
            </div>

            {/* BUTTON LOGIN */}
            <button
              onClick={handleLogin}
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
              LOGIN
            </button>

            {/* REGISTER LINK */}
            <p className="text-center mt-4 text-gray-200 text-[14px]">
              Belum punya akun?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-green-400 font-semibold cursor-pointer"
              >
                Register disini
              </span>
            </p>
          </div>
        </div>

        {/* WHITE CURVE */}
        <svg
          className="absolute left-0 top-0 h-[160vh] w-[1500px] pointer-events-none z-10"
          viewBox="0 0 2000 2000"
          preserveAspectRatio="none"
          style={{ transform: "translateX(-30%)" }}
        >
          <defs>
            <filter id="curveShadow" x="-50%" y="-50%" width="200%" height="200%">
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
            filter="url(#curveShadow)"
          />
        </svg>
      </div>
    </motion.div>
  );
}
