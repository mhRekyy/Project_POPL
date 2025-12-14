export default function QuestionEditor({ question, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...question, [field]: value });
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow mb-6">
      <label className="font-semibold">Pertanyaan:</label>
      <textarea
        className="border p-2 w-full mt-1"
        value={question.question}
        onChange={(e) => updateField("question", e.target.value)}
      />

      <div className="mt-4">
        <label className="font-semibold">Pilihan Jawaban:</label>
        {question.choices.map((c, idx) => (
          <input
            key={idx}
            className="border p-2 w-full mt-2"
            value={c}
            onChange={(e) => {
              const newChoices = [...question.choices];
              newChoices[idx] = e.target.value;
              updateField("choices", newChoices);
            }}
          />
        ))}
      </div>

      <div className="mt-4">
        <label className="font-semibold">Jawaban Benar:</label>
        <input
          className="border p-2 w-full"
          value={question.answer}
          onChange={(e) => updateField("answer", e.target.value)}
        />
      </div>
    </div>
  );
}
