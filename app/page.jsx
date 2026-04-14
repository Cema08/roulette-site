"use client";
import { useState } from "react";

const emojis = ["🎉", "🎁", "💰", "🔥", "⭐", "🍀"];

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

    const index = Math.floor(Math.random() * emojis.length);
    const angle = 360 / emojis.length;
    const finalRotation = 360 * 5 + index * angle;

    setRotation(finalRotation);
    setResult(emojis[index]);

    setCodes(codes.filter(c => c !== codeInput));
    setCodeInput("");

    setTimeout(() => {
      setShowWin(true);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      {!started ? (
        <button style={styles.startBtn} onClick={() => setStarted(true)}>
          SEX
        </button>
      ) : (
        <>
          <div
            style={{
              ...styles.wheel,
              transform: `rotate(${rotation}deg)`
            }}
            onClick={spin}
          >
            {emojis.map((e, i) => (
              <div
                key={i}
                style={{
                  ...styles.segment,
                  transform: `rotate(${i * 60}deg)`
                }}
              >
                <span style={styles.emoji}>{e}</span>
              </div>
            ))}
          </div>

          <div style={styles.arrow}></div>

          <input
            placeholder="Enter code"
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            style={styles.input}
          />

          <button onClick={spin} style={styles.spinBtn}>
            Spin
          </button>

          <div style={styles.result}>
            Result: {result}
          </div>

          <hr style={{ margin: "30px 0", width: "200px" }} />

          {!isAdmin ? (
            <>
              <input
                placeholder="Admin password"
                onChange={e => {
                  if (e.target.value === ADMIN_PASSWORD) {
                    setIsAdmin(true);
                  }
                }}
                style={styles.input}
              />
            </>
          ) : (
            <div>
              <button onClick={generateCode} style={styles.adminBtn}>
                Generate Code
              </button>
              <div>{codes.join(", ")}</div>
            </div>
          )}
        </>
      )}

      {showWin && (
        <div style={styles.overlay}>
          <div style={styles.winBox}>
            <h1 style={{ fontSize: "80px" }}>{result}</h1>
            <button
              onClick={() => setShowWin(false)}
              style={styles.spinBtn}
            >
              Spin Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#ff9ad5,#fd58e7)",
    paddingTop: "50px"
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
  wheel: {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    border: "10px solid black",
    margin: "auto",
    position: "relative",
    transition: "transform 3s ease-out",
    overflow: "hidden"
  },
  segment: {
    position: "absolute",
    width: "50%",
    height: "50%",
    background: "rgba(255,255,255,0.2)",
    transformOrigin: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  emoji: {
    fontSize: "30px"
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderBottom: "30px solid black",
    margin: "20px auto"
  },
  input: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid black"
  },
  spinBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "black",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer"
  },
  adminBtn: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer"
  },
  result: {
    marginTop: "20px",
    fontSize: "20px"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  winBox: {
    background: "white",
    padding: "50px",
    borderRadius: "20px"
  }
};