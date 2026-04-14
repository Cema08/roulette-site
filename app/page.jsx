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

const segments = ["🎉","🎁","💰","🔥","⭐","🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  // ✅ генерация кода
  const generateCode = async () => {
    try {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      await addDoc(collection(db, "codes"), {
        code: newCode
      });

      alert("CODE: " + newCode);
    } catch (e) {
      alert("Ошибка Firebase");
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
      alert("Ошибка при spin");
      console.error(e);
    }
  };

  return (
    <div className="container">

      {/* 🔥 СТАРТОВЫЙ ЭКРАН */}
      {!started && (
        <button className="sex" onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {/* 🎡 ОСНОВНОЙ ЭКРАН */}
      {started && (
        <div className="wrap">

          <div className="arrow"></div>

          <div
            className="wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((emoji, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const r = 140;

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

          <input
            placeholder="Enter code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={spin}>SPIN</button>

          {/* 🔐 АДМИН */}
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
            <button onClick={generateCode}>Generate code</button>
          )}

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

        .wheel {
          width: 400px;
          height: 400px;
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
          margin-bottom: 20px;
        }

        .emoji {
          position: absolute;
          transform: translate(-50%, -50%);
          font-size: 34px;
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
      `}</style>
    </div>
  );
}