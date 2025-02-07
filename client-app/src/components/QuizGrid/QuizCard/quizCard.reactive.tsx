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
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  tags,
  author,
  date,
  points,
}) => {
  const navigate = useNavigate();

  return (
    <div className="quiz-card" onClick={() => navigate(`/quiz/${id}`)}>
      <h3>{title}</h3>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p>
        {author} • {date} • {points} балів
      </p>
    </div>
  );
};

export default QuizCard;
