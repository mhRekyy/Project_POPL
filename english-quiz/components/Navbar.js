"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../public/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  // scroll spy hanya aktif di halaman "/"
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const aboutTop = aboutSection.offsetTop - 120; // biar ga ketutup navbar
      const scrollY = window.scrollY;

      if (scrollY >= aboutTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (id) => {
    if (typeof window !== "undefined") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src={logo} alt="EngLite Logo" width={45} height={45} />
          <span className="text-2xl font-extrabold text-green-700">EngLite</span>
        </div>

        {/* Menu Tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 text-lg font-extrabold tracking-wide capitalize">
          {/* Home */}
          {pathname === "/" ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`transition ${
                activeSection === "home"
                  ? "text-green-700"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Home
            </button>
          ) : (
            <Link
              href="/"
              className={`transition ${
                pathname === "/" ? "text-green-700" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Home
            </Link>
          )}

          {/* About */}
          {pathname === "/" ? (
            <button
              onClick={() => scrollToSection("about")}
              className={`transition ${
                activeSection === "about"
                  ? "text-green-700"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              About
            </button>
          ) : (
            <Link
              href="/#about"
              className="text-gray-700 hover:text-green-600 transition"
            >
              About
            </Link>
          )}

          {/* Quiz */}
          <Link
            href="/quiz"
            className={`transition ${
              pathname.startsWith("/quiz")
                ? "text-green-700"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            Quiz
          </Link>
        </div>

        {/* Spacer kanan */}
        <div className="w-[100px]"></div>
      </div>
    </nav>
  );
}
