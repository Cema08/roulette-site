"use client";
import { useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMpMm3LaIQUDBeBZ13moUfC0uNtjev5jw",
  authDomain: "wheeeeloflove.firebaseapp.com",
  projectId: "wheeeeloflove",
  storageBucket: "wheeeeloflove.firebasestorage.app",
  messagingSenderId: "193596042102",
  appId: "1:193596042102:web:b92c7ffa9c1c80136ce857"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const segments = ["🎉","🎁","💰","🔥","⭐","🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  // 🔥 генерация
  const generateCode = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    await addDoc(collection(db, "codes"), { code });
  };

  // 🎰 spin
  const spin = async () => {
    if (!input) return;

    setLoading(true);

    const snapshot = await getDocs(collection(db, "codes"));
    let found = null;

    snapshot.forEach((d) => {
      if (d.data().code === input) found = d;
    });

    if (!found) {
      setLoading(false);
      return;
    }

    await deleteDoc(doc(db, "codes", found.id));

    const index = Math.floor(Math.random() * 6);
    const angle = 360 / 6;

    const final = rotation + 360 * 6 + (360 - index * angle);

    setRotation(final);
    setResult(segments[index]);
    setInput("");

    // ⏳ ждем пока колесо докрутится
    setTimeout(() => {
      setShowResult(true);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="container">

      {!started && (
        <button className="sex" onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {started && (
        <div className="wrap">

          <div className="arrow"></div>

          <div
            className={`wheel ${loading ? "spinning" : ""}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((e, i) => {
              const angle = (i * 60 - 90) * Math.PI / 180;
              const r = 150;

              return (
                <div
                  key={i}
                  className="emoji"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px)`
                  }}
                >
                  {e}
                </div>
              );
            })}
          </div>

          <div className="controls">
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
                  onClick={() =>
                    adminPass === "admin123"
                      ? setIsAdmin(true)
                      : null
                  }
                >
                  Login
                </button>
              </>
            ) : (
              <button onClick={generateCode}>Generate</button>
            )}
          </div>
        </div>
      )}

      {/* 💎 РЕЗУЛЬТАТ */}
      {showResult && (
        <div className="overlay">
          <div className="resultBox">
            <div className="bigEmoji">{result}</div>

            <button
              onClick={() => {
                setShowResult(false);
              }}
            >
              SPIN AGAIN
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: url("/bg.jpg") center/cover no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sex {
          font-size: 60px;
          padding: 30px 100px;
          border-radius: 30px;
          background: linear-gradient(145deg,#ff4fd8,#ff008c);
          color: white;
          border: 3px solid black;
          animation: pulse 1.2s infinite;
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
          background: conic-gradient(
            #ff0055,
            #ffcc00,
            #00ff88,
            #00c3ff,
            #7a00ff,
            #ff00cc
          );
          position: relative;
          transition: transform 4s ease-out;
        }

        .emoji {
          position: absolute;
          transform: translate(-50%, -50%);
          font-size: 36px;
        }

        .arrow {
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 30px solid black;
          margin-bottom: 10px;
        }

        .controls {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        input {
          padding: 10px;
          border-radius: 10px;
          background: rgba(0,0,0,0.6);
          color: white;
        }

        button {
          padding: 10px 20px;
          border-radius: 10px;
          background: black;
          color: white;
        }

        /* 💎 overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .resultBox {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
        }

        .bigEmoji {
          font-size: 80px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}