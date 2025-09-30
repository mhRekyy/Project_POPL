"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Level2() {
  const router = useRouter();

  const questions = [
    { id: 1, question: "Where ___ you from?", choices: ["is", "are"], answer: "are" },
    { id: 2, question: "I usually ___ breakfast at 7 a.m.", choices: ["have", "has"], answer: "have" },
    { id: 3, question: "They ___ to school yesterday.", choices: ["go", "went"], answer: "went" },
    { id: 4, question: "Opposite of happy", choices: ["Sad", "Smile"], answer: "Sad" },
    { id: 5, question: "Which sentence is correct?", choices: ["I has a car", "I have a car"], answer: "I have a car" },
    { id: 6, question: "What time is it? 08:30", choices: ["Half past eight", "Eight past half"], answer: "Half past eight" },
    { id: 7, question: "What is the past tense of eat?", choices: ["Eat", "Ate"], answer: "Ate" },
    { id: 8, question: "Which word is an adjective?", choices: ["Fast", "Run", "Dog"], answer: "Fast" },
    { id: 9, question: "There ___ three books on the table.", choices: ["is", "are"], answer: "are" },
    { id: 10, question: "Which is a question word?", choices: ["Who", "Apple", "Chair"], answer: "Who" },
    { id: 11, question: "My father ___ football every Sunday.", choices: ["play", "plays"], answer: "plays" },
    { id: 12, question: "What is 12 divided by 4?", choices: ["2", "3", "4"], answer: "3" },
    { id: 13, question: "Which is correct?", choices: ["She can sings", "She can sing"], answer: "She can sing" },
    { id: 14, question: "What’s the opposite of early?", choices: ["Late", "Soon"], answer: "Late" },
    { id: 15, question: "I ___ TV last night.", choices: ["watch", "watched"], answer: "watched" },
    { id: 16, question: "How many days are in a year?", choices: ["364", "365"], answer: "365" },
    { id: 17, question: "The past tense of go is", choices: ["Go", "Went"], answer: "Went" },
    { id: 18, question: "Which one is a preposition?", choices: ["Under", "Dog", "Run"], answer: "Under" },
    { id: 19, question: "There ___ some milk in the fridge.", choices: ["is", "are"], answer: "is" },
    { id: 20, question: "What does hungry mean?", choices: ["Want to sleep", "Want to eat"], answer: "Want to eat" },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questions.some((q) => !answers[q.id])) {
      alert("Silakan jawab semua soal terlebih dahulu.");
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if ((answers[q.id] || "").toLowerCase() === q.answer.toLowerCase()) {
        correct++;
      }
    });

    const scorePercent = Math.round((correct / questions.length) * 100);
    localStorage.setItem("score_level_2", String(scorePercent));

    if (scorePercent >= 75) {
      const prevUnlocked = parseInt(localStorage.getItem("unlockedLevel") || "2", 10);
      const newUnlocked = Math.max(prevUnlocked, 3);
      localStorage.setItem("unlockedLevel", String(newUnlocked));
    }

    setResult({ correct, total: questions.length, percent: scorePercent });
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
    <main className="min-h-screen flex p-6 bg-gray-50">
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
        <h1 className="text-3xl font-bold mb-6 text-green-700">Level 2 - Intermediate</h1>

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
          </>
        ) : reviewMode ? (
          <>
            {/* Review mode */}
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
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={c}
                            checked={isSelected}
                            disabled
                          />
                          <span>{c}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol navigasi */}
            <div className="flex gap-3 mt-6">
              {result.percent >= 75 ? (
                <button
                  onClick={() => router.push("/quiz/level3")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Lanjut ke Level 3
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
