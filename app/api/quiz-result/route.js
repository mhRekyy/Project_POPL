import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// =========================
// POST → Simpan hasil quiz
// =========================
export async function POST(request) {
  try {
    const { level, score, passed, userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const newResult = await prisma.quizResult.create({
      data: {
        level,
        score,
        passed,
        user: { connect: { id: userId } }
      }
    });

    return NextResponse.json(newResult, { status: 201 });
  } catch (error) {
    console.error("Error saving quiz:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// =========================
// GET → Ambil history quiz user
// =========================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ ok: false, error: "userId is required" });
    }

    const results = await prisma.quizResult.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, data: results });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json({ ok: false, error: error.message });
  }
}
