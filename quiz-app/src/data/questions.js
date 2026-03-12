// src/data/questions.js
// All quiz questions are stored here as a plain data array.
// Each object contains: id, category, question text, 4 options, and the correct answer.
// To add more questions, simply push another object following the same shape.

const questions = [
  {
    id: 1,
    category: "Science",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    id: 2,
    category: "Technology",
    question: "Which company developed the React JavaScript library?",
    options: ["Google", "Microsoft", "Meta (Facebook)", "Twitter"],
    correctAnswer: "Meta (Facebook)",
  },
  {
    id: 3,
    category: "Geography",
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 4,
    category: "Science",
    question: "How many bones are in the adult human body?",
    options: ["186", "206", "256", "306"],
    correctAnswer: "206",
  },
  {
    id: 5,
    category: "Technology",
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperText Transmission Process",
      "Hyperlink Transfer Protocol",
    ],
    correctAnswer: "HyperText Transfer Protocol",
  },
  {
    id: 6,
    category: "History",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
  },
  {
    id: 7,
    category: "Science",
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 8,
    category: "Math",
    question: "What is the value of π (Pi) rounded to 2 decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctAnswer: "3.14",
  },
  {
    id: 9,
    category: "Technology",
    question: "Which data structure uses LIFO (Last In, First Out) order?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
  },
  {
    id: 10,
    category: "Geography",
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
    correctAnswer: "Tokyo",
  },
];

export default questions;
