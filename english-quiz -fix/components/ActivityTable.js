export default function ActivityTable({ activities }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Aktivitas Terbaru</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-800 font-semibold">
            <th className="py-2">User</th>
            <th className="py-2">Aktivitas</th>
            <th className="py-2">Waktu</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((a, i) => (
            <tr key={i} className="border-b text-gray-900">
              <td className="py-2">{a.user}</td>
              <td className="py-2">{a.action}</td>
              <td className="py-2">{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
