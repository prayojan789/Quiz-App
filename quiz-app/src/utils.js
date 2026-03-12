// src/utils.js
// Pure utility/helper functions used across the quiz application.
// Keeping these here avoids duplication and makes logic easy to test.

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Creates and returns a NEW shuffled array — does not mutate the original.
 * @param {Array} arr - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export function shuffleArray(arr) {
  const shuffled = [...arr]; // copy so we don't mutate the source
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Converts a zero-based option index to a letter label.
 * 0 → "A", 1 → "B", 2 → "C", 3 → "D"
 * @param {number} index - Zero-based index
 * @returns {string} - Uppercase letter
 */
export function getOptionLabel(index) {
  return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
}

/**
 * Calculates the score as a percentage, rounded to the nearest integer.
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} - Percentage (0–100)
 */
export function getScorePercent(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Returns a performance descriptor object based on the percentage score.
 * Used on the ResultScreen to show personalised feedback.
 * @param {number} percent - Score percentage (0–100)
 * @returns {{ label: string, emoji: string, color: string }}
 */
export function getPerformanceLabel(percent) {
  if (percent === 100) return { label: "Perfect!",     emoji: "🏆", color: "#f0c040" };
  if (percent >= 80)   return { label: "Excellent!",   emoji: "🌟", color: "#4ade80" };
  if (percent >= 60)   return { label: "Good Job!",    emoji: "👍", color: "#60a5fa" };
  if (percent >= 40)   return { label: "Keep Trying",  emoji: "💪", color: "#fb923c" };
  return                      { label: "Needs Work",   emoji: "📚", color: "#f87171" };
}
