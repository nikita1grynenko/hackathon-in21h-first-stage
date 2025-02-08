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
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, beatae aliquid, impedit nisi unde dolorem error, neque voluptatum quibusdam dolorum aliquam. Iure molestiae, magnam itaque magni molestias ducimus earum eligendi.",
    comments: [
      {
        author: "Dude",
        text: "Хороший тамада, і конкурси веселі.",
        date: "07.02.2025",
        time: "13:22",
      },
      {
        author: "Dude",
        text: "Це якийсь пздц",
        date: "06.02.2025",
        time: "17:22",
      },
    ],
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
        {(quiz.comments || []).map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <div className="comment-author">
                <div className="avatar">
                  <svg
                    className="avatar-placeholder"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <strong>{comment.author}</strong>
              </div>
              <div className="comment-date">
                <span>{comment.date}</span>
                <span>{comment.time}</span>
              </div>
            </div>
            <div className="comment-text">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleQuiz;
