import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz-card.style.css';
import { type QuestSimplified } from '../../models/quest.model';
import formatTime from '../../utils/time-format';

const QuizCard: React.FC<QuestSimplified> = ({
  id,
  title,
  questScore,
  timeLimit,
  difficulty,
  topic,
}) => {
  const navigate = useNavigate();
  const tags = useMemo(() => {
    return [difficulty, topic];
  }, [difficulty, topic]);

  return (
    <div className="quiz-card" onClick={() => navigate(`/quiz/${id}`)}>
      <div className="quiz-card-header">
        <h3>{title}</h3>
        <span className="points">x {questScore} pts</span>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="quiz-info">
        <div className="user-info">
          {/* <div className="avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={author} />
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
          </div> */}
          {/* <span className="author">{author}</span> */}
        </div>
        <span>•</span>
        <span>{formatTime(timeLimit)}</span>
      </div>
    </div>
  );
};

export default QuizCard;
