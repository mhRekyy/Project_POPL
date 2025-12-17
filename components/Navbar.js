"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import logo from "../public/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [hash, setHash] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  // Update hash ketika route berubah
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
    }
  }, [pathname]);

  // Listener saat hash berubah
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Auto-set hash saat scroll di halaman home
  useEffect(() => {
    if (pathname !== "/") return;

    const about = document.getElementById("about");
    if (!about) return;

    const handleScroll = () => {
      const top = about.offsetTop - 150;

      if (window.scrollY >= top) {
        if (window.location.hash !== "#about") {
          window.history.replaceState(null, null, "#about");
          setHash("#about");
        }
      } else {
        if (window.location.hash !== "") {
          window.history.replaceState(null, null, " ");
          setHash("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (id) => {
    const s = document.getElementById(id);
    if (!s) return;

    // smooth scroll dulu
    s.scrollIntoView({ behavior: "smooth" });

    // setelah smooth scroll selesai ±400ms, baru update hash
    setTimeout(() => {
      window.history.replaceState(null, null, `#${id}`);
    }, 400);
  };

  const initial = session?.user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 mt-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3 select-none">
          <Image src={logo} alt="EngLite Logo" width={45} height={45} />
          <span className="text-2xl font-extrabold text-green-900">EngLite</span>
        </div>

        {/* MENU */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            flex items-center gap-20 px-20 py-2
            rounded-full shadow-xl
            bg-gradient-to-r from-green-500 to-green-900
            font-bold tracking-wide text-lg
          "
        >

          {/* HOME */}
          {pathname === "/" ? (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });

                setTimeout(() => {
                  window.history.replaceState(null, null, "/");
                }, 400);

              }}
              className={`transition ${
                hash === "" ? "text-black scale-110" : "text-white/100 hover:text-white/75"
              }`}
            >
              HOME
            </button>
          ) : (
            <Link
              href="/"
              className="transition text-white/100 hover:text-white/75"
            >
              HOME
            </Link>
          )}

          {/* ABOUT */}
          {pathname === "/" ? (
            <button
              onClick={() => scrollToSection("about")}
              className={`transition ${
                hash === "#about" ? "text-black scale-110" : "text-white/100 hover:text-white/75"
              }`}
            >
              ABOUT
            </button>
          ) : (
            <Link
              href="/#about"
              className="transition text-white/100 hover:text-white/75"
            >
              ABOUT
            </Link>
          )}

          {/* QUIZ */}
          <Link
            href="/quiz"
            className={`transition ${
              pathname.startsWith("/quiz")
                ? "text-black scale-110"
                : "text-white/100 hover:text-white/75"
            }`}
          >
            QUIZ
          </Link>
        </div>

        {/* AVATAR */}
        {session && (
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="
                w-10 h-10 rounded-full 
                bg-white text-green-900
                flex items-center justify-center
                border-2 border-green-900
                font-bold text-lg shadow-md
                hover:scale-110 transition
              "
            >
              {initial}
            </button>

            {openDropdown && (
              <div
                className="
                  absolute right-0 mt-6 w-40 
                  bg-white shadow-xl rounded-xl 
                  py-2 border-2 border-green-900
                "
              >
                <p className="font-semibold px-6 py-2 text-xl text-gray-800 border-b mb-2">
                  {session.user.name}
                </p>

                <Link
                  href="/profile"
                  onClick={() => setOpenDropdown(false)}
                  className="block px-6 py-2 text-gray-800 hover:bg-gray-200 rounded-lg"
                >
                  Profil
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-6 py-2 text-red-600 hover:bg-gray-200 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
