"use client";
import { useState } from "react";

const segments = ["🎉","🎁","💰","🔥","⭐","🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [showWin, setShowWin] = useState(false);

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

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

    const final = rotation + 360 * 6 + (360 - index * angle);

    setRotation(final);
    setResult(segments[index]);

    setCode("");
    setInput("");

    setTimeout(() => setShowWin(true), 4000);
  };

  return (
    <div className="container">

      {/* 🔥 START */}
      {!started && (
        <button className="sex" onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {/* 🎡 MAIN */}
      {started && (
        <div className="wrap">

          <div className="arrow"></div>

          <div
            className="wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={spin}
          >

            {/* ✨ блеск */}
            <div className="shine"></div>

            {/* 💥 ИДЕАЛЬНЫЕ СМАЙЛЫ */}
            {segments.map((emoji, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const radius = 140;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="emoji"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                >
                  {emoji}
                </div>
              );
            })}

            <div className="center"></div>
          </div>

          {/* UI */}
          <input
            placeholder="Enter code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={spin}>SPIN</button>

          {/* ADMIN */}
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
                  if (adminPass === "admin123") setIsAdmin(true);
                  else alert("Wrong password");
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button onClick={generateCode}>Generate code</button>
              {code && <div className="code">{code}</div>}
            </>
          )}
        </div>
      )}

      {/* 🎉 WIN */}
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
          background: url("/bg.jpg") center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .sex {
          font-size: 50px;
          padding: 30px 90px;
          border-radius: 30px;
          background: linear-gradient(145deg,#ff4fd8,#ff008c);
          color: white;
          border: 3px solid black;
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wheel {
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 14px solid #c2b280;
          position: relative;
          margin-bottom: 20px;
          transition: transform 4s cubic-bezier(.2,.8,.2,1);

          background: conic-gradient(
            #ff0055 0deg 60deg,
            #ffcc00 60deg 120deg,
            #00ff88 120deg 180deg,
            #00c3ff 180deg 240deg,
            #7a00ff 240deg 300deg,
            #ff00cc 300deg 360deg
          );

          box-shadow:
            inset 0 0 40px rgba(255,255,255,0.4),
            inset 0 -20px 60px rgba(0,0,0,0.4),
            0 20px 40px rgba(0,0,0,0.4);
        }

        .shine {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255,255,255,0.5),
            transparent 60%
          );
        }

        .emoji {
          position: absolute;
          font-size: 34px;
          transform: translate(-50%, -50%);
        }

        .center {
          position: absolute;
          width: 70px;
          height: 70px;
          background: gold;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 4px solid black;
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
        }
      `}</style>
    </div>
  );
}