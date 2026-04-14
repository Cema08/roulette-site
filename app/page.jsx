"use client";
import { useState } from "react";

const segments = ["🎉", "🎁", "💰", "🔥", "⭐", "🍀"];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [codes, setCodes] = useState([]);
  const [input, setInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showWin, setShowWin] = useState(false);

  const ADMIN_PASS = "admin123";

  // 🎯 генерация кода
  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodes([...codes, newCode]);
  };

  // 🎰 крутка
  const spin = () => {
    if (!codes.includes(input)) {
      alert("Invalid code");
      return;
    }

    const index = Math.floor(Math.random() * segments.length);
    const angle = 360 / segments.length;

    const final = rotation + 360 * 5 + index * angle;

    setRotation(final);
    setResult(segments[index]);

    setCodes(codes.filter(c => c !== input));
    setInput("");

    setTimeout(() => setShowWin(true), 3500);
  };

  return (
    <div style={styles.container}>

      {/* 🔥 START */}
      {!started && (
        <button style={styles.sexBtn} onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {/* 🎡 MAIN */}
      {started && (
        <>
          <div style={styles.wheelWrapper}>

            {/* стрелка */}
            <div style={styles.arrow}></div>

            {/* колесо */}
            <div
              style={{
                ...styles.wheel,
                transform: `rotate(${rotation}deg)`
              }}
              onClick={spin}
            >
              {segments.map((emoji, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.segment,
                    background: colors[i],
                    transform: `rotate(${i * 60}deg)`
                  }}
                >
                  <span style={styles.emoji}>{emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ввод кода */}
          <input
            placeholder="Enter code"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={styles.input}
          />

          <button onClick={spin} style={styles.spinBtn}>
            SPIN
          </button>

          {/* админ */}
          {!isAdmin ? (
            <input
              placeholder="Admin password"
              onChange={e => {
                if (e.target.value === ADMIN_PASS) setIsAdmin(true);
              }}
              style={styles.input}
            />
          ) : (
            <>
              <button onClick={generateCode} style={styles.adminBtn}>
                Generate Code
              </button>
              <div style={{ color: "white" }}>{codes.join(", ")}</div>
            </>
          )}
        </>
      )}

      {/* 🎉 WIN SCREEN */}
      {showWin && (
        <div style={styles.overlay}>
          <div style={styles.winBox}>
            <h1 style={{ fontSize: "100px" }}>{result}</h1>
            <button onClick={() => setShowWin(false)} style={styles.spinBtn}>
              SPIN AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const colors = [
  "#ff4d6d",
  "#f9c74f",
  "#43aa8b",
  "#f3722c",
  "#577590",
  "#9b5de5"
];

const styles = {
  container: {
    minHeight: "100vh",
    textAlign: "center",
    background: "#fd58e7",
    paddingTop: "40px"
  },

  sexBtn: {
    padding: "30px 80px",
    fontSize: "40px",
    borderRadius: "25px",
    border: "2px solid black",
    background: "#ff00aa",
    color: "white",
    cursor: "pointer",
    animation: "pulse 1.2s infinite"
  },

  wheelWrapper: {
    position: "relative",
    width: "420px",
    margin: "auto"
  },

  wheel: {
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    border: "12px solid black",
    position: "relative",
    overflow: "hidden",
    transition: "transform 3.5s cubic-bezier(0.2,0.8,0.2,1)"
  },

  segment: {
    position: "absolute",
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    transformOrigin: "0% 0%",
    clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  emoji: {
    transform: "rotate(30deg)",
    fontSize: "30px"
  },

  arrow: {
    position: "absolute",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "35px solid black"
  },

  input: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "10px"
  },

  spinBtn: {
    marginTop: "10px",
    padding: "12px 30px",
    background: "black",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer"
  },

  adminBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "green",
    color: "white",
    borderRadius: "10px"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  winBox: {
    background: "white",
    padding: "60px",
    borderRadius: "20px"
  }
};