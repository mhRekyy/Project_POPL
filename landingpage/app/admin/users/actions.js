"use server";

import prisma from "@/lib/prisma";

// Ambil semua user + support fitur search + total attempt
export async function getUsers(search = "") {
  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,

      // Ambil total attempt per user
      quizResults: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
