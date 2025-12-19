import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET() {
  try {
    // Cek apakah URL dan Token ada
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error("Redis credentials are missing in environment variables");
    }

    const rawLogs = await redis.lrange('project_logs', 0, -1);
    
    // Jika log masih kosong, kirim array kosong saja, jangan error
    if (!rawLogs || rawLogs.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    const logs = rawLogs.map(log => {
      try {
        return typeof log === 'string' ? JSON.parse(log) : log;
      } catch (e) {
        return { message: "Invalid log format", raw: log };
      }
    });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error("REDIS API ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}