export const dynamic = "force-dynamic";

import { getUsers } from "./actions";

export default async function UsersPage({ searchParams }) {
  const search = searchParams.search || "";
  const users = await getUsers(search);

  return (
    <div className="p-6">

      <h1 className="text-5xl font-bold text-green-700 mb-20">
        Daftar Users
      </h1>

      {/* Search Box */}
      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Cari user berdasarkan nama atau email..."
          className="border-2 rounded-xl px-4 py-3 w-full mb-6 shadow-sm text-gray-800 placeholder-gray-500"
        />
      </form>

      {/* Section User Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-2">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          Data Pengguna
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-800 font-semibold">
              <th className="py-2">Nama</th>
              <th className="py-2">Email</th>
              <th className="py-2">Total Attempt</th>
              <th className="py-2">Tanggal Daftar</th>
            </tr>
          </thead>

          <tbody>
            {(users ?? []).map((u) => (
              <tr key={u.id} className="border-b text-gray-900">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.quizResults.length}</td>
                <td className="py-2">
                  {new Date(u.createdAt).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
