import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { level, questions } = await req.json();

  const filePath = path.join(process.cwd(), "data", `quiz-level-${level}.json`);

  const jsonData = {
    questions
  };

  await writeFile(filePath, JSON.stringify(jsonData, null, 2));

  return Response.json({ message: "Saved!" });
}
