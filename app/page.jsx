"use client";
import { useState } from "react";

const segments = [
  { emoji: "🎉", color: "#ff4d6d" },
  { emoji: "🎁", color: "#f9c74f" },
  { emoji: "💰", color: "#43aa8b" },
  { emoji: "🔥", color: "#f3722c" },
  { emoji: "⭐", color: "#577590" },
  { emoji: "🍀", color: "#9b5de5" },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [showWin, setShowWin] = useState(false);

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const ADMIN_PASS = "admin123";

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(newCode);
  };

  const spin = () => {
    if (input !== code) {
      alert("Invalid code");
      return;
    }

    const index = Math.floor(Math.random() * segments.length);
    const angle = 360 / segments.length;

    const final = rotation + 360 * 6 + index * angle;

    setRotation(final);
    setResult(segments[index].emoji);

    setCode("");
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
        <div className="wheel-container">

          {/* стрелка */}
          <div className="arrow"></div>

          {/* колесо */}
          <div
            className="wheel"
            onClick={spin}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((seg, i) => (
              <div
                key={i}
                className="segment"
                style={{
                  background: seg.color,
                  transform: `rotate(${i * 60}deg)`
                }}
              >
                <span className="emoji">{seg.emoji}</span>
              </div>
            ))}

            <div className="center"></div>
          </div>

          {/* UI */}
          <input
            placeholder="Enter code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={spin}>SPIN</button>

          {!isAdmin ? (
            <>
              <input
                type="password"
                placeholder="Admin password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
              />
              <button
                onClick={() => {
                  if (adminPass === ADMIN_PASS) setIsAdmin(true);
                  else alert("Wrong password");
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button onClick={generateCode}>Generate code</button>
              {code && <div>{code}</div>}
            </>
          )}
        </div>
      )}

      {showWin && (
        <div className="overlay">
          <div className="win">
            <div className="big">{result}</div>
            <button onClick={() => setShowWin(false)}>SPIN AGAIN</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg,#ff9ad5,#fd58e7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        /* SEX BUTTON */
        .sex {
          font-size: 50px;
          padding: 30px 90px;
          border-radius: 30px;
          background: linear-gradient(145deg,#ff4fd8,#ff008c);
          color: white;
          border: 3px solid black;
          animation: pulse 1.2s infinite;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .wheel-container {
          animation: fadeIn 0.7s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .wheel {
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 12px solid black;
          position: relative;
          overflow: hidden;
          transition: transform 4s cubic-bezier(.2,.8,.2,1);
          margin-bottom: 20px;
        }

        .segment {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 50%;
          left: 50%;
          transform-origin: 0% 0%;
          clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .emoji {
          transform: rotate(30deg);
          font-size: 28px;
        }

        .center {
          position: absolute;
          width: 60px;
          height: 60px;
          background: gold;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 3px solid black;
        }

        .arrow {
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 30px solid black;
          margin-bottom: 10px;
        }

        input {
          margin: 5px;
          padding: 10px;
          border-radius: 10px;
        }

        button {
          margin: 5px;
          padding: 10px 20px;
          border-radius: 10px;
          background: black;
          color: white;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .big {
          font-size: 120px;
          margin-bottom: 20px;
        }

        .win {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}