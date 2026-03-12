// src/components/StartScreen.jsx
// The landing / welcome screen shown before the quiz begins.
// Displays the title, rules summary, and a "Start Quiz" button.
//
// Props:
//   onStart         (function) — called when the user clicks Start Quiz
//   totalQuestions  (number)   — shown in the description line

import React from "react";

function StartScreen({ onStart, totalQuestions }) {
  // Rules displayed in the info grid
  const rules = [
    { icon: "⏱️", text: "10 seconds per question" },
    { icon: "✅", text: "Answers revealed instantly" },
    { icon: "🔀", text: "Questions are shuffled" },
    { icon: "🏆", text: "Score tracked throughout" },
  ];

  return (
    <div className="page-center">
      {/* Decorative background glows */}
      <div className="start-screen__orb start-screen__orb--1" />
      <div className="start-screen__orb start-screen__orb--2" />

      <div className="card start-screen__card">
        {/* Top glow line accent */}
        <div className="start-screen__top-line" />

        {/* Category badge */}
        <div className="start-screen__badge">🧠 Knowledge Quiz</div>

        {/* Headline */}
        <h1 className="start-screen__title">
          Are you ready<br />
          <span className="start-screen__title-accent">to be tested?</span>
        </h1>

        {/* Sub-description */}
        <p className="start-screen__desc">
          {totalQuestions} questions across Science, Technology,
          Geography, History and Math.
        </p>

        {/* Rules grid — 2 columns */}
        <div className="start-screen__rules">
          {rules.map(({ icon, text }) => (
            <div key={text} className="start-screen__rule">
              <span className="start-screen__rule-icon">{icon}</span>
              <span className="start-screen__rule-text">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button className="start-screen__btn" onClick={onStart}>
          Start Quiz →
        </button>

        <p className="start-screen__hint">Questions are randomly shuffled each time</p>
      </div>
    </div>
  );
}

export default StartScreen;
