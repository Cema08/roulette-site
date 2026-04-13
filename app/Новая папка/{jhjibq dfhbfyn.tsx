"use client";
import { useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");

  const [codes, setCodes] = useState([]);
  const [usedCodes, setUsedCodes] = useState([]);
  const [input, setInput] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const ADMIN_PASSWORD = "1234";

  const prizes = ["🎁", "💰", "🔥", "🍀", "⭐", "🎉"];

  const loginAdmin = () => {
    if (adminPass === ADMIN_PASSWORD) setIsAdmin(true);
    else alert("Неверный пароль");
  };

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodes([...codes, code]);
  };

  const spin = () => {
    if (!codes.includes(input)) return alert("Неверный код");
    if (usedCodes.includes(input)) return alert("Код уже использован");

    const index = Math.floor(Math.random() * prizes.length);

    const newRotation =
      rotation + 360 * 6 + (360 - index * (360 / prizes.length));

    setRotation(newRotation);
    setResult(prizes[index]);

    setUsedCodes([...usedCodes, input]);
    setInput("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* 🌸 ФОН */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500" />
      <div className="absolute inset-0 backdrop-blur-[40px] opacity-70" />

      {/* 🎡 КОЛЕСО */}
      <div className="relative w-[750px] h-[750px] flex items-center justify-center">

        {/* стрелка */}
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-black"></div>

        {/* колесо */}
        <div
          className="w-full h-full rounded-full border-[16px] border-black shadow-2xl flex items-center justify-center relative"
          style={{
            transform: `rotate(${rotation}deg)`,
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
          {/* смайлы */}
          {prizes.map((emoji, i) => {
            const angle = i * 60 + 30;

            return (
              <div
                key={i}
                className="absolute text-5xl"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -260px) rotate(-${angle}deg)`
                }}
              >
                {emoji}
              </div>
            );
          })}

          {/* центр */}
          <div className="absolute w-28 h-28 bg-yellow-400 rounded-full border-4 border-black shadow-xl flex items-center justify-center text-2xl">
            🎡
          </div>
        </div>
      </div>

      {/* 🎯 ВВОД */}
      <div className="mt-10 flex flex-col items-center gap-4 z-10">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder="Введи код"
          className="px-6 py-3 rounded-xl border-2 border-black shadow-lg outline-none bg-white text-black placeholder:text-gray-400"
        />

        <button
          onClick={spin}
          className="px-10 py-3 bg-black text-white rounded-xl text-lg hover:scale-105 transition"
        >
          Крутить
        </button>

        {/* 💥 БОЛЬШОЙ РЕЗУЛЬТАТ */}
        {result && (
          <div className="flex flex-col items-center mt-4">
            <div className="text-lg text-black">Выпало:</div>

            <div className="text-[100px] mt-2 drop-shadow-lg">
              {result}
            </div>
          </div>
        )}
      </div>

      {/* 🔐 АДМИН */}
      {!isAdmin && (
        <div className="mt-10 text-center z-10">
          <input
            type="password"
            placeholder="Пароль админа"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-black shadow-lg bg-white text-black"
          />
          <br />
          <button
            onClick={loginAdmin}
            className="mt-3 px-6 py-2 bg-black text-white rounded-xl"
          >
            Войти как админ
          </button>
        </div>
      )}

      {/* 👑 АДМИН ПАНЕЛЬ */}
      {isAdmin && (
        <div className="mt-10 text-center border-t border-black pt-6 z-10">
          <h2 className="text-xl mb-4 text-black font-bold">
            Админ панель
          </h2>

          <button
            onClick={generateCode}
            className="px-6 py-2 bg-green-500 rounded-xl mb-4 text-white"
          >
            Сгенерировать код
          </button>

          <div className="text-black">
            {codes.map((c) => (
              <div key={c}>{c}</div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}