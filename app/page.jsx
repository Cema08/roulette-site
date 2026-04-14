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
  const [codeInput, setCodeInput] = useState("");
  const [codes, setCodes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showWin, setShowWin] = useState(false);

  const ADMIN_PASSWORD = "admin123";

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCodes([...codes, code]);
  };

  const spin = () => {
    if (!codes.includes(codeInput)) {
      alert("Invalid code");
      return;
    }

    const index = Math.floor(Math.random() * segments.length);
    const angle = 360 / segments.length;
    const finalRotation = rotation + 360 * 5 + index * angle;

    setRotation(finalRotation);
    setResult(segments[index].emoji);

    setCodes(codes.filter(c => c !== codeInput));
    setCodeInput("");

    setTimeout(() => setShowWin(true), 3500);
  };

  return (
    <div style={styles.container}>
      {!started ? (
        <button style={styles.startBtn} onClick={() => setStarted(true)}>
          SEX
        </button>
      ) : (
        <>
          <div style={styles.wheelWrapper}>
            <div
              style={{
                ...styles.wheel,
                transform: `rotate(${rotation}deg)`
              }}
              onClick={spin}
            >
              {segments.map((seg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.segment,
                    background: seg.color,
                    transform: `rotate(${i * (360 / segments.length)}deg)`
                  }}
                >
                  <span style={styles.emoji}>{seg.emoji}</span>
                </div>
              ))}
            </div>

            <div style={styles.arrow}></div>
          </div>

          <input
            placeholder="Enter code"
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            style={styles.input}
          />

          <button onClick={spin} style={styles.spinBtn}>
            SPIN
          </button>

          <div style={styles.result}>{result}</div>

          {!isAdmin ? (
            <input
              placeholder="Admin password"
              onChange={e => {
                if (e.target.value === ADMIN_PASSWORD) {
                  setIsAdmin(true);
                }
              }}
              style={styles.input}
            />
          ) : (
            <>
              <button onClick={generateCode} style={styles.adminBtn}>
                Generate Code
              </button>
              <div style={{ color: "white" }}>{codes.join(" , ")}</div>
            </>
          )}
        </>
      )}

      {showWin && (
        <div style={styles.overlay}>
          <div style={styles.winBox}>
            <h1 style={{ fontSize: "100px" }}>{result}</h1>
            <button
              onClick={() => setShowWin(false)}
              style={styles.spinBtn}
            >
              SPIN AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    textAlign: "center",
    background: "linear-gradient(135deg,#ff9ad5,#fd58e7)",
    paddingTop: "40px"
  },
  startBtn: {
    padding: "30px 80px",
    fontSize: "40px",
    borderRadius: "20px",
    border: "2px solid black",
    background: "#ff00aa",
    color: "white",
    cursor: "pointer",
    animation: "pulse 1s infinite"
  },
  wheelWrapper: {
    position: "relative",
    width: "400px",
    margin: "auto"
  },
  wheel: {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    border: "10px solid black",
    position: "relative",
    overflow: "hidden",
    transition: "transform 3.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
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
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderBottom: "30px solid black"
  },
  input: {
    marginTop: "15px",
    padding: "10px",
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
  result: {
    marginTop: "20px",
    fontSize: "25px",
    color: "white"
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