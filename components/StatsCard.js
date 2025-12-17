export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 font-semibold flex items-center gap-6 w-full hover:scale-105 transition">
      <div className="text-green-600 text-4xl">{icon}</div>
      <div>
        <h3 className="text-gray-800 font-bold text-sm">{title}</h3>
        <p className="text-4xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
