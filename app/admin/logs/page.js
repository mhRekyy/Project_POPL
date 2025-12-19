"use client";

import { useEffect, useState } from 'react';
import { RefreshCw, Database, AlertCircle, Info, Clock, Search } from 'lucide-react';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/logs');
      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch logs');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Filter log berdasarkan pencarian (pesan atau level)
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
      <AlertCircle size={48} className="mb-4" />
      <p className="text-xl font-semibold">Ups! Terjadi kesalahan</p>
      <p className="text-sm">{error}</p>
      <button onClick={fetchLogs} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Coba Lagi</button>
    </div>
  );

  return (
    <div className="p-6 bg-transparent min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Database className="text-white" /> System Activity Logs
          </h1>
          <p className="text-green-100 mt-1">Pantau aktivitas real-time aplikasi dari Redis</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari log..."
              className="pl-10 pr-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm border-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700 w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchLogs}
            disabled={loading}
            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all disabled:opacity-50"
          >
            <RefreshCw size={24} className={`${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-900/5 text-green-900">
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">Level</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">Pesan</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">Detail Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                // Skeleton Loader
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="4" className="px-6 py-8"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                  </tr>
                ))
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                    <Database size={40} className="mx-auto mb-2 opacity-20" />
                    Belum ada log yang tersedia
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-green-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600 font-medium text-sm">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full items-center gap-1 ${
                        log.level === 'ERROR' 
                          ? 'bg-red-100 text-red-600 ring-1 ring-red-200' 
                          : 'bg-green-100 text-green-700 ring-1 ring-green-200'
                      }`}>
                        {log.level === 'ERROR' ? <AlertCircle size={12} /> : <Info size={12} />}
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-800 font-semibold">{log.message}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs group-hover:max-w-md transition-all">
                        <pre className="text-[10px] font-mono bg-gray-900 text-green-400 p-3 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                          {JSON.stringify(log.detail, null, 2)}
                        </pre>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
          Showing {filteredLogs.length} recent system events from Redis In-Memory Store
        </div>
      </div>
    </div>
  );
}