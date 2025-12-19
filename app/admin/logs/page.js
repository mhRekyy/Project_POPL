"use client"; // Ini adalah Client Component karena ada interaksi user dan fetch data di browser

import { useEffect, useState } from 'react';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/admin/logs'); // Panggil API yang sudah kita buat
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setLogs(data.data); // Simpan log ke state
        } else {
          throw new Error(data.error || 'Failed to fetch logs');
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []); // [] berarti hanya dijalankan sekali saat komponen dimuat

  if (loading) {
    return <div className="p-4 text-center">Loading logs...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Application Logs (Redis)</h1>
      
      {logs.length === 0 ? (
        <p className="text-gray-600 text-center">No logs found yet. Try performing some actions in the app!</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                      log.level === 'INFO' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded-md">{JSON.stringify(log.detail, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}