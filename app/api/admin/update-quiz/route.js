import { writeFile } from "fs/promises";
import path from "path";
import { redisLogger } from "@/lib/redisLogger"; // Import logger redis

export async function POST(req) {
  try {
    const { level, questions } = await req.json();

    // 1. Catat upaya perubahan kuis
    await redisLogger.info(`Admin attempting to update quiz level ${level}`, {
      level,
      questionCount: questions?.length
    });

    const filePath = path.join(process.cwd(), "data", `quiz-level-${level}.json`);

    const jsonData = {
      questions
    };

    // Proses penulisan file
    await writeFile(filePath, JSON.stringify(jsonData, null, 2));

    // 2. Catat keberhasilan perubahan
    await redisLogger.info(`Quiz level ${level} successfully updated`, {
      path: filePath
    });

    return Response.json({ message: "Saved!" });

  } catch (error) {
    // 3. Catat jika gagal (misal: folder 'data' tidak ditemukan atau permission denied)
    await redisLogger.error(`Failed to update quiz level`, {
      errorMessage: error.message,
      stack: error.stack
    });

    return Response.json({ error: "Failed to save quiz data" }, { status: 500 });
  }
}