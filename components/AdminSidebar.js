"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaMedal,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", href: "/admin/users", icon: <FaUsers /> },
    { name: "Quiz", href: "/admin/quiz", icon: <FaClipboardList /> },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: <FaMedal /> },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-green-900 text-white p-6 shadow-xl flex flex-col justify-between z-50">
      
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-10">

          {/* bg-logo */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
            <Image
              src="/logo.png"
              alt="EngLite Logo"
              width={50}
              height={50}
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            EngLite Admin
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition font-bold ${
                pathname === menu.href
                  ? "bg-white text-green-900 shadow-md"
                  : "hover:bg-green-700"
              }`}
            >
              {menu.icon}
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 p-3 rounded-xl transition font-bold text-red-600 hover:text-white hover:bg-red-600"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
