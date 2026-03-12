// src/components/QuestionCard.jsx
// Renders a single quiz question with its four option buttons.
// Handles answer highlighting (correct = green, wrong = red) after selection.
// Also shows the ProgressBar at the top and the TimerRing in the header.
//
// Props:
//   question       (object)      — { category, question, options, correctAnswer }
//   onAnswer       (function)    — called with the selected option string
//   selectedAnswer (string|null) — null until the user picks an answer
//   timeLeft       (number)      — seconds left for this question
//   totalTime      (number)      — total seconds allowed (for TimerRing)
//   currentIndex   (number)      — 0-based index of the current question
//   total          (number)      — total number of questions
//   score          (number)      — current score

import React from "react";
import ProgressBar from "./ProgressBar";
import TimerRing   from "./TimerRing";
import { getOptionLabel } from "../utils";

function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  timeLeft,
  totalTime,
  currentIndex,
  total,
  score,
}) {
  const { category, question: text, options, correctAnswer } = question;

  /**
   * Returns the CSS class name(s) for an option button
   * based on whether the user has answered and what they chose.
   */
  const getOptionClass = (option) => {
    if (!selectedAnswer) return "option-btn"; // no answer yet — neutral state

    if (option === correctAnswer)                         return "option-btn option-btn--correct"; // always highlight correct
    if (option === selectedAnswer && option !== correctAnswer) return "option-btn option-btn--wrong";   // wrong pick
    return "option-btn option-btn--dimmed";                                                             // other options fade out
  };

  /**
   * Returns the CSS class for the letter label pill (A/B/C/D).
   * Correct answer gets a filled green pill; wrong gets red; others stay neutral.
   */
  const getLabelClass = (option) => {
    if (!selectedAnswer) return "option-btn__label";
    if (option === correctAnswer)                            return "option-btn__label option-btn__label--correct";
    if (option === selectedAnswer && option !== correctAnswer) return "option-btn__label option-btn__label--wrong";
    return "option-btn__label";
  };

  const isAnswered = !!selectedAnswer;

  return (
    <div className="question-card">

      {/* ── Header: progress bar + timer ring ── */}
      <div className="question-card__header">
        <div className="question-card__progress">
          <ProgressBar
            current={currentIndex + 1}
            total={total}
            score={score}
          />
        </div>
        <TimerRing timeLeft={timeLeft} totalTime={totalTime} />
      </div>

      {/* ── Category pill ── */}
      <div className="question-card__category">
        <span className="category-badge">{category}</span>
      </div>

      {/* ── Question text ── */}
      <h2 className="question-card__text">{text}</h2>

      {/* ── Answer options ── */}
      <div className="question-card__options">
        {options.map((option, index) => (
          <button
            key={option}
            className={getOptionClass(option)}
            onClick={() => !isAnswered && onAnswer(option)}
            disabled={isAnswered}
            aria-label={`Option ${getOptionLabel(index)}: ${option}`}
          >
            {/* Letter label (A, B, C, D) */}
            <span className={getLabelClass(option)}>
              {getOptionLabel(index)}
            </span>

            {/* Option text */}
            <span className="option-btn__text">{option}</span>

            {/* Tick or cross icon shown after answering */}
            {isAnswered && option === correctAnswer && (
              <span className="option-btn__icon">✓</span>
            )}
            {isAnswered && option === selectedAnswer && option !== correctAnswer && (
              <span className="option-btn__icon">✗</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Feedback message after answer ── */}
      {isAnswered && selectedAnswer !== "__timeout__" && (
        <div
          className={
            selectedAnswer === correctAnswer
              ? "question-card__feedback question-card__feedback--correct"
              : "question-card__feedback question-card__feedback--wrong"
          }
        >
          {selectedAnswer === correctAnswer
            ? "✓ Correct! Great job!"
            : `✗ Wrong! The answer was: ${correctAnswer}`}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
