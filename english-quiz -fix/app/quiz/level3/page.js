"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import level3Data from "@/data/level3.json";

export default function Level3() {
  const { data: session } = useSession();
  const router = useRouter();

  const questions = level3Data;

  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (qId, choice) => {
    setAnswers((prev) => ({ ...prev, [qId]: choice }));
  };

  const toggleFlag = (qId) => {
    setFlags((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.some((q) => !answers[q.id])) {
      alert("Silakan jawab semua soal terlebih dahulu.");
      return;
    }

    if (!session) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if ((answers[q.id] || "").toLowerCase() === q.answer.toLowerCase()) {
        correct++;
      }
    });

    const scorePercent = Math.round((correct / questions.length) * 100);
    localStorage.setItem("score_level_3", String(scorePercent));

    if (scorePercent >= 75) {
      const prevUnlocked = parseInt(localStorage.getItem("unlockedLevel") || "3", 10);
      const newUnlocked = Math.max(prevUnlocked, 4);
      localStorage.setItem("unlockedLevel", String(newUnlocked));
    }

    setResult({ correct, total: questions.length, percent: scorePercent });

    await fetch("/api/quiz-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: 3,
        score: scorePercent,
        passed: scorePercent >= 75,
        userId: Number(session.user.id),
      }),
    });

    setReviewMode(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setFlags({});
    setCurrentIndex(0);
    setResult(null);
    setReviewMode(false);
  };

  useEffect(() => {
    if (result?.percent >= 75) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [result]);

  const getAchievement = (percent) => {
    if (percent === 100) return "🏆 Perfect Score!";
    if (percent >= 90) return "🌟 Excellent Work!";
    if (percent >= 75) return "🎉 Great Job!";
    return "💪 Keep Trying!";
  };

  const progressPercent = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <main className="min-h-screen flex p-6 bg-gray-50 pt-28 justify-center gap-10">

      {/* Sidebar Navigasi */}
      <aside className="w-52 mr-6 sticky top-6">
        <h2 className="font-bold text-lg mb-4 text-green-700">Navigasi Soal</h2>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 text-sm rounded transition-colors 
                ${idx === currentIndex ? "bg-green-300 text-black" : answers[q.id] ? "bg-green-200 text-black" : "bg-white text-gray-900"} 
                ${flags[q.id] ? "ring-2 ring-yellow-400" : ""} hover:scale-105`}
            >
              {q.id}
            </button>
          ))}
        </div>
      </aside>

      {/* Konten utama */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Level 3 - Advanced</h1>

        {!result ? (
          <>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-5 mb-6 overflow-hidden">
              <div
                className="h-5 rounded-full transition-all bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Soal aktif */}
            {currentQuestion && (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div className="p-6 border rounded-lg shadow bg-white transition hover:shadow-lg">
                  <p className="font-semibold text-lg mb-4 text-black">
                    {currentQuestion.id}. {currentQuestion.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.choices.map((c) => (
                      <label
                        key={c}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition
                          ${answers[currentQuestion.id] === c ? "bg-green-100 border-green-500 scale-105" : "hover:bg-green-50"}`}
                      >
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          value={c}
                          checked={answers[currentQuestion.id] === c}
                          onChange={() => handleSelect(currentQuestion.id, c)}
                        />
                        <span className="text-black">{c}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition 
                      ${flags[currentQuestion.id] ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-700"} hover:opacity-90`}
                  >
                    {flags[currentQuestion.id] ? "🚩 Ragu" : "Tandai Ragu"}
                  </button>
                </div>

                {/* Navigasi soal */}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="px-5 py-2 border rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    ← Sebelumnya
                  </button>

                  {currentIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Selanjutnya →
                    </button>
                  ) : (
                    <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Submit Jawaban
                    </button>
                  )}
                </div>
              </form>
            )}
          </>
        ) : reviewMode ? (
          <>
            {/* Review */}
            <div className="max-w-3xl mb-6 p-6 border rounded-lg bg-white shadow">
              <h2 className="text-2xl font-bold mb-3 text-black">Review Jawaban</h2>
              <p className="mb-1 text-black">Benar: {result.correct} / {result.total}</p>
              <p className="mb-1 text-black">Skor: {result.percent}%</p>
              <p className="mt-2 font-semibold text-lg text-black">{getAchievement(result.percent)}</p>
            </div>

            <div className="space-y-6 max-w-3xl">
              {questions.map((q) => (
                <div key={q.id} className="p-4 border rounded-lg bg-white shadow">
                  <p className="font-medium mb-2 text-black">{q.id}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.choices.map((c) => {
                      const isSelected = answers[q.id] === c;
                      const isCorrect = isSelected && c.toLowerCase() === q.answer.toLowerCase();
                      const isWrong = isSelected && !isCorrect;

                      return (
                        <label
                          key={c}
                          className={`flex items-center gap-2 p-2 border rounded
                            ${isCorrect ? "bg-green-200 border-green-600 text-black" : ""}
                            ${isWrong ? "bg-red-200 border-red-600 text-black" : ""}
                            ${!isCorrect && !isWrong ? "text-black" : ""}`}
                        >
                          <input type="radio" checked={isSelected} disabled />
                          <span>{c}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {result.percent >= 75 ? (
                <button
                  onClick={() => router.push("/quiz/level4")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Lanjut ke Level 4
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Ulangi Level
                </button>
              )}

              <button
                onClick={() => router.push("/quiz")}
                className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 text-black transition"
              >
                Kembali ke Pilih Level
              </button>

              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 text-black transition"
              >
                Kembali ke Home
              </button>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
