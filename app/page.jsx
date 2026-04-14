"use client";
import { useState } from "react";

const segments = [
  { emoji: "🎉", color: "#ff4d6d" },
  { emoji: "🎁", color: "#ff6b81" },
  { emoji: "💰", color: "#f9c74f" },
  { emoji: "🔥", color: "#06d6a0" },
  { emoji: "🍀", color: "#118ab2" },
  { emoji: "⭐", color: "#9b5de5" },
];

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

    const index = Math.floor(Math.random() * segments.length);
    const angle = 360 / segments.length;

    const final = rotation + 360 * 5 + index * angle;

    setRotation(final);
    setResult(segments[index].emoji);

    setCodes(codes.filter(c => c !== input));
    setInput("");

    setTimeout(() => setShowWin(true), 3500);
  };

  return (
    <div style={styles.container}>

      {!started && (
        <button style={styles.sexBtn} onClick={() => setStarted(true)}>
          SEX
        </button>
      )}

      {started && (
        <>
          <div style={styles.wrapper}>
            <div style={styles.arrow}></div>

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
                    transform: `rotate(${i * 60}deg)`
                  }}
                >
                  <span style={styles.emoji}>{seg.emoji}</span>
                </div>
              ))}

              <div style={styles.center}></div>
            </div>
          </div>

          <input
            placeholder="Enter code"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={styles.input}
          />

          <button onClick={spin} style={styles.spinBtn}>
            SPIN
          </button>

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

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#ff9ad5,#fd58e7)",
    textAlign: "center",
    paddingTop: "40px"
  },

  sexBtn: {
    fontSize: "50px",
    padding: "30px 90px",
    borderRadius: "30px",
    background: "#ff00aa",
    color: "white",
    border: "2px solid black",
    animation: "pulse 1.2s infinite"
  },

  wrapper: {
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
    justifyContent: "center",
    alignItems: "center"
  },

  emoji: {
    transform: "rotate(30deg)",
    fontSize: "30px"
  },

  center: {
    position: "absolute",
    width: "60px",
    height: "60px",
    background: "gold",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "3px solid black"
  },

  arrow: {
    position: "absolute",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "35px solid black"
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
    borderRadius: "10px"
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
    inset: 0,
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