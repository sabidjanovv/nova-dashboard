import React, { useState } from "react";

type WorkType = "interior" | "exterior";

const Calculate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<WorkType>("interior");
  const [area, setArea] = useState<number | "">("");
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const sqm = Number(area);
    if (!sqm || sqm <= 0) {
      setResult("❌ Iltimos, kvadrat metrni to‘g‘ri kiriting!");
      return;
    }

    let pricePerSqm = type === "interior" ? 25 : 30;
    if (sqm > 1000) {
      pricePerSqm -= 10;
    } else if (sqm > 100) {
      pricePerSqm -= 5;
    }

    const total = sqm * pricePerSqm;
    setResult(
      `✅ ${sqm} m² ${
        type === "interior" ? "Interior" : "Exterior"
      } uchun umumiy narx: $${total.toLocaleString()}`
    );
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center text-xl font-bold"
      >
        💬
      </button>

      {/* Popup Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl p-5 z-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">Calculator</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {/* Select Type */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Ish turi</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as WorkType)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="interior">Interior ($25/m²)</option>
              <option value="exterior">Exterior ($30/m²)</option>
            </select>
          </div>

          {/* Input Area */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Kvadrat metr
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) =>
                setArea(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Masalan: 120"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Hisoblash
          </button>

          {/* Result */}
          {result && (
            <div className="mt-3 p-3 bg-gray-100 rounded-lg text-center text-sm font-medium">
              {result}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Calculate;
