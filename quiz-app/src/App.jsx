// src/App.jsx
// Root component — owns ALL quiz state and orchestrates screen transitions.
//
// Quiz flow:  "start"  →  "playing"  →  "finished"
//                              ↑              |
//                              └── restart ───┘
//
// State managed here:
//   quizState      — which screen is showing
//   questions      — shuffled array of question objects
//   currentIndex   — which question the user is on (0-based)
//   score          — count of correct answers
//   selectedAnswer — the option the user clicked (null until clicked)
//   timeLeft       — countdown seconds for the current question
//   answers        — history of { question, chosen, correct } for results

import React, { useState, useEffect, useCallback, useRef } from "react";

import StartScreen   from "./components/StartScreen";
import QuestionCard  from "./components/QuestionCard";
import ResultScreen  from "./components/ResultScreen";

import allQuestions from "./data/questions";
import { shuffleArray } from "./utils";

import "./styles/main.css";
import "./styles/components.css"; // all component-specific styles

// How many seconds the player gets per question
const TOTAL_TIME = 10;

function App() {
  // ── State declarations ─────────────────────────────────────────────────

  const [quizState,      setQuizState]      = useState("start");   // "start" | "playing" | "finished"
  const [questions,      setQuestions]      = useState([]);          // shuffled questions
  const [currentIndex,   setCurrentIndex]   = useState(0);          // current question index
  const [score,          setScore]          = useState(0);          // correct answer count
  const [selectedAnswer, setSelectedAnswer] = useState(null);       // user's chosen option
  const [timeLeft,       setTimeLeft]       = useState(TOTAL_TIME); // countdown value
  const [answers,        setAnswers]        = useState([]);          // answer history

  // Ref to hold the interval ID so we can clear it at any time
  const timerRef = useRef(null);

  // ── Start / Restart the quiz ──────────────────────────────────────────
  const startQuiz = useCallback(() => {
    // Shuffle questions fresh on every start
    const shuffled = shuffleArray(allQuestions);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(TOTAL_TIME);
    setAnswers([]);
    setQuizState("playing");
  }, []);

  // ── Advance to next question or finish the quiz ───────────────────────
  const advance = useCallback(() => {
    clearInterval(timerRef.current);

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (nextIndex >= allQuestions.length) {
        // All questions done — transition to results screen
        setQuizState("finished");
      } else {
        // Move to next question and reset per-question state
        setSelectedAnswer(null);
        setTimeLeft(TOTAL_TIME);
      }

      return nextIndex;
    });
  }, []);

  // ── Handle the user selecting an answer ──────────────────────────────
  const handleAnswer = useCallback(
    (option) => {
      clearInterval(timerRef.current); // stop the timer immediately

      const currentQuestion = questions[currentIndex];
      const isCorrect = option === currentQuestion.correctAnswer;

      setSelectedAnswer(option);

      // Increment score only for correct answers
      if (isCorrect) setScore((s) => s + 1);

      // Record this answer in the history array for the result screen
      setAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          chosen:   option,
          correct:  isCorrect,
        },
      ]);

      // Auto-advance to the next question after showing the result
      setTimeout(advance, 1800);
    },
    [questions, currentIndex, advance]
  );

  // ── Timer countdown effect ────────────────────────────────────────────
  // Runs whenever: quiz is playing, question changes, or answer is selected.
  useEffect(() => {
    // Don't tick if not playing or if the user already answered
    if (quizState !== "playing" || selectedAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time ran out — mark as timeout (no option selected = wrong)
          clearInterval(timerRef.current);

          const currentQuestion = questions[currentIndex];
          setSelectedAnswer("__timeout__"); // locks the buttons

          setAnswers((prev) => [
            ...prev,
            {
              question: currentQuestion.question,
              chosen:   null,   // nothing was chosen
              correct:  false,
            },
          ]);

          // Auto-advance after a short delay so the user sees "Time's up"
          setTimeout(advance, 1800);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    // Cleanup: clear the interval when the effect re-runs or unmounts
    return () => clearInterval(timerRef.current);
  }, [quizState, currentIndex, selectedAnswer, questions, advance]);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Subtle dot-grid texture over the entire background */}
      <div className="bg-grid" />

      {/* ── Start Screen ── */}
      {quizState === "start" && (
        <StartScreen
          onStart={startQuiz}
          totalQuestions={allQuestions.length}
        />
      )}

      {/* ── Playing Screen ── */}
      {quizState === "playing" && questions.length > 0 && (
        <div className="page-center">
          <div className="card quiz-card">

            {/* Timeout banner — shown when the timer hits zero */}
            {timeLeft === 0 && selectedAnswer === "__timeout__" && (
              <div className="quiz-card__timeout-banner">
                ⏰ Time&apos;s up! Moving to next question…
              </div>
            )}

            <QuestionCard
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              timeLeft={timeLeft}
              totalTime={TOTAL_TIME}
              currentIndex={currentIndex}
              total={questions.length}
              score={score}
            />
          </div>
        </div>
      )}

      {/* ── Result Screen ──  */}
      {quizState === "finished" && (
        <ResultScreen
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={startQuiz}
        />
      )}
    </div>
  );
}

export default App;