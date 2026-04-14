"use client";
import { useState } from "react";

const emojis = ["🎉", "🎁", "💰", "🔥", "⭐", "🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [codes, setCodes] = useState([]);
  const [input, setInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showWin, setShowWin] = useState(false);

  const ADMIN_PASS = "admin123";

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodes([...codes, code]);
  };

  const spin = () => {
    if (!codes.includes(input)) {
      alert("Invalid code");
      return;
    }

    const index = Math.floor(Math.random() * emojis.length);
    const angle = 360 / emojis.length;

    const finalRotation = rotation + 360 * 6 + (360 - index * angle);

    setRotation(finalRotation);
    setResult(emojis[index]);

    setCodes(codes.filter(c => c !== input));
    setInput("");

    setTimeout(() => setShowWin(true), 4000);
  };

  return (
    <div className="container">

      {!started && (
        <button className="sex" onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {started && (
        <>
          <div className="wheel-wrap">
            <div className="arrow"></div>

            <div
              className="wheel"
              onClick={spin}
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>

          <input
            placeholder="Enter code"
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <button onClick={spin}>SPIN</button>

          {!isAdmin ? (
            <input
              placeholder="Admin password"
              onChange={e => {
                if (e.target.value === ADMIN_PASS) setIsAdmin(true);
              }}
            />
          ) : (
            <>
              <button onClick={generateCode}>Generate Code</button>
              <div>{codes.join(", ")}</div>
            </>
          )}
        </>
      )}

      {showWin && (
        <div className="overlay">
          <h1>{result}</h1>
          <button onClick={() => setShowWin(false)}>SPIN AGAIN</button>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: #fd58e7;
          text-align: center;
          padding-top: 50px;
        }

        .sex {
          font-size: 50px;
          padding: 30px 90px;
          border-radius: 30px;
          background: #ff00aa;
          color: white;
          border: 2px solid black;
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .wheel-wrap {
          position: relative;
          width: 500px;
          margin: auto;
        }

        .wheel {
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 15px solid black;
          transition: transform 4s cubic-bezier(.17,.67,.83,.67);
          background: conic-gradient(
            #ff4d6d 0deg 60deg,
            #ffd166 60deg 120deg,
            #06d6a0 120deg 180deg,
            #118ab2 180deg 240deg,
            #9b5de5 240deg 300deg,
            #f15bb5 300deg 360deg
          );
        }

        .arrow {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 35px solid black;
        }

        input {
          margin-top: 15px;
          padding: 10px;
        }

        button {
          margin-top: 10px;
          padding: 10px 20px;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .overlay h1 {
          font-size: 120px;
          color: white;
        }
      `}</style>
    </div>
  );
}