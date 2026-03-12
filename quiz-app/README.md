# Quiz App — React.js

A complete quiz application built with React functional components and hooks.
No external UI frameworks — pure React + CSS.

---

## Features

- **Start screen** with quiz rules overview
- **10 questions** across Science, Technology, Geography, History, Math
- **10-second timer** per question with a circular SVG countdown ring
- **Instant answer feedback** — correct (green) and wrong (red) highlighting
- **Auto-advance** to next question after 1.8 seconds
- **Progress bar** with dot markers for each question
- **Score tracking** throughout the quiz
- **Results screen** with animated score count-up, accuracy stats, and answer breakdown
- **Questions are shuffled** every time you start
- **Fully responsive** — works on mobile and desktop

---

## Project Structure

```
quiz-app/
├── public/
│   └── index.html              ← HTML shell, loads Google Fonts
├── src/
│   ├── components/
│   │   ├── StartScreen.jsx     ← Landing / welcome screen
│   │   ├── QuestionCard.jsx    ← Question + options display
│   │   ├── ResultScreen.jsx    ← Final score and breakdown
│   │   ├── ProgressBar.jsx     ← Question progress indicator
│   │   └── TimerRing.jsx       ← SVG circular countdown timer
│   ├── data/
│   │   └── questions.js        ← All 10 questions (add more here)
│   ├── styles/
│   │   ├── main.css            ← Global tokens, resets, animations
│   │   └── components.css      ← Per-component styles
│   ├── App.jsx                 ← Root component, owns all state
│   ├── main.jsx                ← ReactDOM entry point
│   └── utils.js                ← Pure helper functions
└── package.json
```

---

## Setup & Run

### Prerequisites
- Node.js 18+ (https://nodejs.org)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

App opens at **http://localhost:3000**

### Build for production
```bash
npm run build
```

---

## How to Add More Questions

Open `src/data/questions.js` and add a new object to the array:

```js
{
  id: 11,
  category: "Your Category",
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option B",
}
```

That's it — the quiz automatically includes it and shuffles everything.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| UI        | React 18 (functional components)    |
| State     | useState, useEffect, useCallback    |
| Styling   | Plain CSS with CSS custom properties|
| Fonts     | Sora + JetBrains Mono (Google Fonts)|
| Bundler   | Create React App (react-scripts)    |
