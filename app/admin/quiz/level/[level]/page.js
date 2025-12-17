"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function EditLevel({ params }) {
  const { level } = React.use(params);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadJSON = async () => {
      try {
        const file = await import(`@/data/level${level}.json`);
        if (!Array.isArray(file.default)) {
          setError("Format JSON salah. Seharusnya berupa array.");
          return;
        }
        setQuestions(file.default);
      } catch (err) {
        setError("Gagal memuat soal. Pastikan file JSON level " + level + " ada.");
      } finally {
        setLoading(false);
      }
    };
    loadJSON();
  }, [level]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateChoice = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        choices: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const deleteQuestion = (index) => {
    const updated = questions
      .filter((_, i) => i !== index)
      .map((q, i) => ({ ...q, id: i + 1 }));
    setQuestions(updated);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      await fetch("/api/save-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, questions }),
      });
      alert("Perubahan berhasil disimpan!");
    } catch (err) {
      alert("Gagal menyimpan perubahan.");
    }
    setSaving(false);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-10">
      {/* TITLE + BACK BUTTON */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold text-green-700">
          Edit Soal • Level {level}
        </h1>
        <Link
          href="/admin/quiz"
          className="text-green-700 font-semibold hover:underline"
        >
          ← Kembali ke Daftar Level
        </Link>
      </div>

      {/* QUESTIONS LIST */}
      <div className="grid gap-8">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="border rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700">
                Soal {q.id}
              </h2>
              <button
                onClick={() => deleteQuestion(idx)}
                className="text-red-600 text-sm font-semibold hover:underline"
              >
                Hapus
              </button>
            </div>

            {/* Question */}
            <label className="text-gray-700 font-semibold">Pertanyaan</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded mb-4 mt-1 bg-gray-50 text-gray-800 placeholder-gray-400"
              value={q.question}
              onChange={(e) => updateQuestion(idx, "question", e.target.value)}
            />

            {/* Choices */}
            <label className="text-gray-700 font-semibold">Pilihan Jawaban</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 mb-4">
              {q.choices.map((c, i) => (
                <input
                  key={i}
                  className="border border-gray-300 p-3 rounded bg-gray-50 text-gray-800 placeholder-gray-400"
                  value={c}
                  onChange={(e) => updateChoice(idx, i, e.target.value)}
                  placeholder={`Pilihan ${i + 1}`}
                />
              ))}
            </div>

            {/* Answer */}
            <label className="text-gray-700 font-semibold">Jawaban Benar</label>
            <input
              className="w-full border p-3 rounded text-green-700 font-bold mt-1"
              value={q.answer}
              onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
              placeholder="Jawaban benar"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={addQuestion}
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Tambah Soal
        </button>
        <button
          onClick={saveChanges}
          disabled={saving}
          className="px-5 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}
