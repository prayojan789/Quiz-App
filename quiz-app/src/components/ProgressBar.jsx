// src/components/ProgressBar.jsx
// Displays the current question number, total questions, live score,
// a glowing fill bar, and a dot marker for each question slot.
//
// Props:
//   current (number) — 1-based index of the current question
//   total   (number) — total number of questions in the quiz
//   score   (number) — number of correct answers so far

import React from "react";

function ProgressBar({ current, total, score }) {
  // Calculate how far along the quiz we are (0–100%)
  const percent = (current / total) * 100;

  return (
    <div className="progress-bar">
      {/* Top row: question counter + score */}
      <div className="progress-bar__meta">
        <span className="progress-bar__label">
          Question <span className="progress-bar__accent">{current}</span> of {total}
        </span>
        <span className="progress-bar__score">
          Score: <span className="progress-bar__score-val">{score}</span>
        </span>
      </div>

      {/* Track + fill + dot markers */}
      <div className="progress-bar__track">
        {/* Animated fill */}
        <div
          className="progress-bar__fill"
          style={{ width: `${percent}%` }}
        />

        {/* One dot per question — acts as a visual step indicator */}
        <div className="progress-bar__dots">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="progress-bar__dot"
              style={{
                background: i < current ? "var(--cyan)" : "rgba(255,255,255,0.1)",
                transform: i === current - 1 ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
