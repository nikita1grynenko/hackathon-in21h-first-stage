import React from "react";
import { useNavigate } from "react-router-dom";
import "./quizCard.style.css";

interface QuizCardProps {
  id: number;
  title: string;
  tags: string[];
  author: string;
  date: string;
  points: number;
  avatar?: string; // URL аватарки (опционально)
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  tags,
  author,
  date,
  points,
  avatar,
}) => {
  const navigate = useNavigate();

  return (
    <div className="quiz-card" onClick={() => navigate(`/quiz/${id}`)}>
      <div className="quiz-card-header">
        <h3>{title}</h3>
        <span className="points">x {points} pts</span>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="quiz-info">
        <div className="user-info">
          <div className="avatar">
            {avatar ? (
              <img src={avatar} alt={author} />
            ) : (
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
            )}
          </div>
          <span className="author">{author}</span>
        </div>
        <span>•</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default QuizCard;
