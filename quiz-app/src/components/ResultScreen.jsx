// src/components/ResultScreen.jsx
// Final screen shown when the quiz is complete.
// Shows: animated score count-up, percentage bar, correct/wrong/accuracy stats,
// a per-question answer breakdown list, and a "Play Again" restart button.
//
// Props:
//   score    (number) — total correct answers
//   total    (number) — total questions
//   answers  (Array)  — [{ question, chosen, correct }] for each question
//   onRestart (function) — called when the user clicks Play Again

import React, { useState, useEffect } from "react";
import { getScorePercent, getPerformanceLabel } from "../utils";

function ResultScreen({ score, total, answers, onRestart }) {
  const percent = getScorePercent(score, total);
  const perf    = getPerformanceLabel(percent);

  // Animate the score counting up from 0 to the actual score
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setDisplayScore(count);
      if (count >= score) clearInterval(interval);
    }, 80); // increments every 80ms

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="page-center result-screen">
      <div className="card result-screen__card">

        {/* ── Performance emoji + label ── */}
        <div className="result-screen__perf">
          <div className="result-screen__emoji">{perf.emoji}</div>
          <div
            className="result-screen__perf-label"
            style={{ color: perf.color }}
          >
            {perf.label}
          </div>
        </div>

        {/* ── Score circle block ── */}
        <div className="result-screen__score-block">
          <div
            className="result-screen__score-num"
            style={{ color: perf.color }}
          >
            {displayScore}
            <span className="result-screen__score-denom">/{total}</span>
          </div>
          <div className="result-screen__score-tag">SCORE</div>

          {/* Percentage fill bar */}
          <div className="result-screen__pct-track">
            <div
              className="result-screen__pct-fill"
              style={{ width: `${percent}%`, background: perf.color }}
            />
          </div>
          <div
            className="result-screen__pct-label"
            style={{ color: perf.color }}
          >
            {percent}%
          </div>
        </div>

        {/* ── Stats row: correct / wrong / accuracy ── */}
        <div className="result-screen__stats">
          <div className="stat-box">
            <span className="stat-box__val" style={{ color: "var(--green)" }}>{score}</span>
            <span className="stat-box__label">Correct</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__val" style={{ color: "var(--red)" }}>{total - score}</span>
            <span className="stat-box__label">Wrong</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__val" style={{ color: "var(--cyan)" }}>{percent}%</span>
            <span className="stat-box__label">Accuracy</span>
          </div>
        </div>

        {/* ── Answer breakdown per question ── */}
        <div className="result-screen__breakdown">
          <h3 className="result-screen__breakdown-title">Answer Breakdown</h3>
          <div className="result-screen__breakdown-list">
            {answers.map((a, i) => (
              <div
                key={i}
                className="breakdown-item"
                style={{
                  borderLeftColor: a.correct ? "var(--green)" : "var(--red)",
                }}
              >
                <span className="breakdown-item__q">
                  Q{i + 1}: {a.question.length > 40
                    ? a.question.substring(0, 40) + "…"
                    : a.question}
                </span>
                <span
                  className="breakdown-item__icon"
                  style={{ color: a.correct ? "var(--green)" : "var(--red)" }}
                >
                  {a.correct ? "✓" : "✗"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Restart button ── */}
        <button className="result-screen__btn" onClick={onRestart}>
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;