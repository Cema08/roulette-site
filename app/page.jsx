"use client";
import { useState } from "react";

// 🔥 Firebase
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

// 🎡 секции
const segments = ["🎉","🎁","💰","🔥","⭐","🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // 👉 временно всегда админ (чтобы работало)
  const isAdmin = true;

  // 🔥 генерация кода
  const generateCode = async () => {
    try {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      await addDoc(collection(db, "codes"), {
        code: newCode
      });

      alert("CODE: " + newCode);
    } catch (e) {
      alert("Firebase error");
      console.error(e);
    }
  };

  // 🎰 крутка
  const spin = async () => {
    try {
      const snapshot = await getDocs(collection(db, "codes"));

      let found = null;

      snapshot.forEach((d) => {
        if (d.data().code === input) {
          found = d;
        }
      });

      if (!found) {
        alert("Invalid code");
        return;
      }

      await deleteDoc(doc(db, "codes", found.id));

      const index = Math.floor(Math.random() * segments.length);
      const angle = 360 / segments.length;

      const final = rotation + 360 * 6 + (360 - index * angle);

      setRotation(final);
      setResult(segments[index]);
      setInput("");

    } catch (e) {
      alert("Spin error");
      console.error(e);
    }
  };

  return (
    <div className="container">

      {/* 🔥 СТАРТ */}
      {!started && (
        <button className="sex" onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {/* 🎡 ОСНОВА */}
      {started && (
        <div className="wrap">

          <div className="arrow"></div>

          <div
            className="wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((emoji, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
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
                  {emoji}
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

            {isAdmin && (
              <button onClick={generateCode}>Generate</button>
            )}
          </div>

          <h2>{result}</h2>

        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: url("/bg.jpg") center/cover no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
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
          position: relative;
          margin-bottom: 30px;
          transition: transform 4s ease-out;

          background: conic-gradient(
            #ff0055 0deg 60deg,
            #ffcc00 60deg 120deg,
            #00ff88 120deg 180deg,
            #00c3ff 180deg 240deg,
            #7a00ff 240deg 300deg,
            #ff00cc 300deg 360deg
          );

          box-shadow:
            inset 0 0 40px rgba(255,255,255,0.3),
            0 15px 30px rgba(0,0,0,0.4);
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
          margin-top: 10px;
        }

        input {
          padding: 10px;
          border-radius: 10px;
          border: 2px solid black;
          background: rgba(0,0,0,0.6);
          color: white;
        }

        button {
          padding: 10px 20px;
          border-radius: 10px;
          background: black;
          color: white;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}