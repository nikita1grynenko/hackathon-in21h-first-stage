import { FC } from 'react';
import { Feedback } from '../../models/feedback.model';
import formatDateTime from '../../utils/date-time-format';
import './feedback-item.style.css';

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem: FC<FeedbackItemProps> = ({ feedback }) => {
  return (
    <div className="feedback-item">
      <div className="feedback-meta">
        <span className="feedback-user">{feedback.userName}</span>
        <div className="feedback-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`rating-star ${index < feedback.rating ? 'active' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="feedback-date">
          {formatDateTime(feedback.createdAt).join(' ')}
        </span>
      </div>
      {feedback.comment && <p className="feedback-text">{feedback.comment}</p>}
    </div>
  );
};

export default FeedbackItem;
