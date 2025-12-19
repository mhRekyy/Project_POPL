import { Redis } from '@upstash/redis';

// Menghubungkan ke Redis menggunakan kunci yang tadi disimpan di Vercel
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const redisLogger = {
  // Fungsi untuk mencatat info biasa (Misal: User Login)
  async info(message, detail = {}) {
    const logData = JSON.stringify({
      level: "INFO",
      message: message,
      detail: detail,
      timestamp: new Date().toLocaleString('id-ID'), // Waktu Indonesia
    });

    try {
      await redis.lpush('project_logs', logData); // Simpan ke daftar bernama 'project_logs'
      await redis.ltrim('project_logs', 0, 49);  // Simpan 50 catatan terbaru saja (biar gak penuh)
    } catch (err) {
      console.error("Gagal kirim log ke Redis", err);
    }
  },

  // Fungsi untuk mencatat error (Misal: Gagal ambil data)
  async error(message, detail = {}) {
    const logData = JSON.stringify({
      level: "ERROR",
      message: message,
      detail: detail,
      timestamp: new Date().toLocaleString('id-ID'),
    });

    try {
      await redis.lpush('project_logs', logData);
      await redis.ltrim('project_logs', 0, 49);
    } catch (err) {
      console.error("Gagal kirim log ke Redis", err);
    }
  }
};