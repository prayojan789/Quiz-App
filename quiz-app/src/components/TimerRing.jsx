// src/components/TimerRing.jsx
// A circular SVG countdown timer that visually depletes as time runs out.
// Changes colour green → amber → red in the final seconds.
//
// Props:
//   timeLeft  (number) — seconds remaining
//   totalTime (number) — total seconds allowed per question

import React from "react";

function TimerRing({ timeLeft, totalTime }) {
  const SIZE   = 64;                        // outer diameter in px
  const STROKE = 5;                         // ring stroke width
  const R      = (SIZE - STROKE) / 2;       // radius of the circle
  const CIRC   = 2 * Math.PI * R;           // full circumference
  const ratio  = timeLeft / totalTime;      // 1.0 → 0.0 as time depletes
  const offset = CIRC * (1 - ratio);        // how much of the ring is "empty"

  // Colour shifts based on urgency
  const color =
    timeLeft > 6 ? "var(--green)"  :
    timeLeft > 3 ? "var(--amber)"  :
                   "var(--red)";

  return (
    <div className="timer-ring" style={{ width: SIZE, height: SIZE }}>
      {/* SVG ring drawn rotated so it depletes clockwise from the top */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{ transform: "rotate(-90deg)" }}
        aria-label={`${timeLeft} seconds remaining`}
      >
        {/* Static background ring */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="var(--surface2)"
          strokeWidth={STROKE}
        />
        {/* Animated progress ring */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>

      {/* Number displayed in the centre of the ring */}
      <div
        className="timer-ring__number"
        style={{
          color,
          // Pulse animation when 3 or fewer seconds remain
          animation: timeLeft <= 3 ? "pulse 0.8s ease-in-out infinite" : "none",
        }}
      >
        {timeLeft}
      </div>
    </div>
  );
}

export default TimerRing;
