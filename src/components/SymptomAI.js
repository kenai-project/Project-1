// src/components/SymptomAI.js
import React, { useState } from "react";
import axios from "axios";

function SymptomAI() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/symptoms", { symptoms });
      setDiagnosis(res.data.answer);
    } catch (err) {
      setDiagnosis("Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-4 rounded shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">🩺 Symptom Checker</h2>
      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Enter symptoms (e.g., chest pain, headache)..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCheck}>
        Analyze
      </button>
      {diagnosis && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>AI Response:</strong> <p>{diagnosis}</p>
        </div>
      )}
    </div>
  );
}

export default SymptomAI;
