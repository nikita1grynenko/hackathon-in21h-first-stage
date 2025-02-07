import React from "react";
import { useParams } from "react-router-dom";
import "./singleQuiz.style.css";

const quizzes = [
  {
    id: 1,
    title: "Придумати ідею",
    tags: ["Тест", "Змагання", "Складний"],
    author: "Dude",
    date: "06.02.2025",
    content: "Lorem Ipsum is simply dummy text...",
  },
  {
    id: 2,
    title: "Придумати дизайн",
    tags: ["Тест", "Команда", "Простий"],
    author: "Dude",
    date: "06.02.2025",
    content: "Це текст про дизайн...",
  },
];

const SingleQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const quiz = quizzes.find((q) => q.id === Number(id));

  if (!quiz) {
    return <h2>Квест не знайдено!</h2>;
  }

  return (
    <div className="single-quiz">
      <h1>{quiz.title}</h1>
      <div className="tags">
        {quiz.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="content">{quiz.content}</p>

      <div className="comment-section">
        <textarea placeholder="Напишіть свій коментар тут..."></textarea>
      </div>

      <div className="comments">
        <div className="comment">
          <strong>Dude</strong> Хороший тамада, і конкурси веселі.
        </div>
        <div className="comment">
          <strong>Dude</strong> Це якийсь пздц
        </div>
      </div>
    </div>
  );
};

export default SingleQuiz;
