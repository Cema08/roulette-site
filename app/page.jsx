"use client";
import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const prizes = ["🎁", "💰", "🔥", "🍀", "⭐", "🎉"];

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(newCode);
  };

  const spin = () => {
    if (!input || input !== code) {
      alert("Enter a valid code");
      return;
    }

    const index = Math.floor(Math.random() * prizes.length);

    const newRotation =
      rotation + 360 * 6 + (360 - index * (360 / prizes.length));

    setRotation(newRotation);

    setTimeout(() => {
      setResult(prizes[index]);
      setShowResult(true);
    }, 4000);

    setCode("");
    setInput("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center flex-col relative overflow-hidden">

      {/* 🌸 ФОН */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/10 -z-10" />

      {/* 🔥 START */}
      {!started && (
        <button
          onClick={() => {
            setStarted(true);
            setTimeout(() => setShowWheel(true), 300);
          }}
          className="sex-btn"
        >
          SEX
        </button>
      )}

      {/* 🎡 WHEEL */}
      {started && (
        <div
          className={`flex flex-col items-center transition-all duration-700 ${
            showWheel ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative w-[650px] h-[650px]">

            {/* стрелка */}
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-black"></div>

            {/* колесо */}
            <div
              onClick={spin}
              className="w-full h-full rounded-full border-[14px] border-black shadow-2xl flex items-center justify-center relative cursor-pointer"
              style={{
                transform: `rotate(${rotation}deg)`,
                willChange: "transform",
                transition: "transform 4s cubic-bezier(0.25,1,0.5,1)",
                background: `
                  conic-gradient(
                    #ff4d6d 0deg 60deg,
                    #ffd166 60deg 120deg,
                    #06d6a0 120deg 180deg,
                    #118ab2 180deg 240deg,
                    #9b5de5 240deg 300deg,
                    #f15bb5 300deg 360deg
                  )
                `
              }}
            >
              {/* СМАЙЛЫ — ФИКС */}
              {prizes.map((emoji, i) => {
                const angle = i * 60 + 30;
                return (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `
                        rotate(${angle}deg)
                        translate(-50%, -50%)
                        translateY(-240px)
                        rotate(-${angle}deg)
                      `,
                      transformOrigin: "center"
                    }}
                  >
                    {emoji}
                  </div>
                );
              })}

              {/* центр */}
              <div className="absolute w-24 h-24 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center">
                🎡
              </div>
            </div>
          </div>

          {/* UI */}
          <div className="mt-8 flex flex-col items-center gap-4">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter code"
              className="px-6 py-3 rounded-xl border-2 border-black bg-white text-black"
            />

            <button
              onClick={spin}
              className="px-10 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
            >
              Spin
            </button>

            {/* ADMIN */}
            <div className="mt-4 flex flex-col items-center gap-2">

              <input
                type="password"
                placeholder="Admin password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="px-4 py-2 border-2 border-black rounded-xl bg-white text-black"
              />

              <button
                onClick={() => {
                  if (adminPass === "admin123") setIsAdmin(true);
                  else alert("Wrong password");
                }}
                className="bg-black text-white px-6 py-2 rounded-xl"
              >
                Login as admin
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={generateCode}
                    className="bg-green-500 text-white px-6 py-2 rounded-xl"
                  >
                    Generate code
                  </button>

                  {code && <div className="text-black font-bold">{code}</div>}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🎉 RESULT */}
      {showResult && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">

          <div className="text-[120px] mb-6 animate-bounce">
            {result}
          </div>

          <button
            onClick={() => {
              setShowResult(false);
              setResult("");
            }}
            className="px-10 py-4 bg-white text-black rounded-xl text-xl hover:scale-110 transition"
          >
            Spin again
          </button>

        </div>
      )}

      {/* стили */}
      <style jsx>{`
        .sex-btn {
          font-size: 40px;
          font-weight: bold;
          padding: 30px 80px;
          border-radius: 30px;
          background: linear-gradient(145deg, #ff4fd8, #ff008c);
          color: white;
          border: 2px solid black;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>

    </main>
  );
}