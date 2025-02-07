import React from "react";
import QuizCard from "./QuizCard/quizCard.reactive";
import "./quizGrid.style.css";

const quizzes = [
  {
    id: 1,
    title: "Придумати ідею",
    tags: ["Тест", "Змагання", "Складний"],
    author: "Dude",
    date: "06.02.2025",
    points: 100,
  },
  {
    id: 2,
    title: "Придумати дизайн",
    tags: ["Тест", "Команда", "Простий"],
    author: "Dude",
    date: "07.02.2025",
    points: 80,
  },
];

const QuizGrid: React.FC = () => {
  return (
    <div>
      <div className="quiz-grid">
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} {...quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizGrid;
