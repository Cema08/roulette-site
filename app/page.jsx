"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const spin = () => {
    const items = ["🎉", "🎁", "💰", "🔥", "⭐", "🍀"];
    const random = items[Math.floor(Math.random() * items.length)];
    setResult(random);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎰 Roulette</h1>
      <button onClick={spin}>Spin</button>
      <h2>{result}</h2>
    </div>
  );
}