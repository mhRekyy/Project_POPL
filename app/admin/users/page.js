import { getUsers } from "./actions";
import { Users, Search, Mail, Calendar, Hash, UserCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage({ searchParams }) {
  const search = searchParams.search || "";
  const users = await getUsers(search);

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-5xl font-extrabold text-white flex items-center gap-4 tracking-tight">
            <Users size={48} className="text-white" />
            User Management
          </h1>
          <p className="text-green-100 text-lg mt-2 font-medium">
            Kelola dan pantau seluruh pengguna yang terdaftar di EngLite.
          </p>
        </div>

        {/* Search Box Modern */}
        <form className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
          <input
            name="search"
            defaultValue={search}
            placeholder="Cari nama atau email..."
            className="w-full bg-white/90 backdrop-blur-md border-none rounded-2xl pl-12 pr-4 py-4 shadow-xl focus:ring-2 focus:ring-green-400 text-gray-800 transition-all outline-none"
          />
        </form>
      </div>

      {/* Main Table Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-900">Database Pengguna</h2>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {users?.length || 0} Total Users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-900/5 text-green-900 uppercase text-xs font-bold tracking-widest">
                <th className="px-8 py-5">Profile</th>
                <th className="px-8 py-5">Contact Information</th>
                <th className="px-8 py-5 text-center">Activity</th>
                <th className="px-8 py-5 text-right">Join Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {(!users || users.length === 0) ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-gray-400">
                    <UserCircle size={48} className="mx-auto mb-2 opacity-20" />
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-green-50/50 transition-colors group">
                    {/* Column Nama dengan Avatar */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-green-900/20">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors">
                            {u.name}
                          </p>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md uppercase font-bold tracking-tighter">
                            Student ID: #{u.id.toString().padStart(4, '0')}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column Email */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Mail size={16} className="text-gray-400" />
                        {u.email}
                      </div>
                    </td>

                    {/* Column Total Attempt dengan Badge */}
                    <td className="px-8 py-5">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-lg font-black text-sm">
                          <Hash size={14} />
                          {u.quizResults?.length || 0}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 font-bold uppercase">Attempts</span>
                      </div>
                    </td>

                    {/* Column Tanggal Daftar */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                          <Calendar size={16} className="text-green-600" />
                          {new Date(u.createdAt).toLocaleDateString("id-ID", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium italic">Verified Account</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        <div className="bg-gray-50/50 px-8 py-4 text-xs text-gray-400 italic">
          * Data pengguna tersinkronisasi langsung dengan database PostgreSQL melalui Prisma ORM.
        </div>
      </div>
    </div>
  );
}