import { FC, useCallback } from 'react';
import { Feedback } from '../../models/feedback.model';
import formatDateTime from '../../utils/date-time-format';
import { deleteFeedback } from '../../middleware/feedback.fetching';
import './feedback-item.style.css';

interface FeedbackItemProps {
  feedback: Feedback;
  onDelete: (id: string) => void;
}

const FeedbackItem: FC<FeedbackItemProps> = ({ feedback, onDelete }) => {
  const handleDelete = useCallback(async () => {
    if (window.confirm('Ви впевнені, що хочете видалити цей фідбек?')) {
      const result = await deleteFeedback(feedback.id);
      if (result) {
        onDelete(feedback.id);
      }
    }
  }, [feedback.id, onDelete]);

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
        <button className="delete-feedback-btn" onClick={handleDelete}>
          Видалити
        </button>
      </div>
      {feedback.comment && <p className="feedback-text">{feedback.comment}</p>}
    </div>
  );
};

export default FeedbackItem;
