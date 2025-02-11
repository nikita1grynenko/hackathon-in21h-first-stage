import {
  type FC,
  ChangeEvent,
  ElementRef,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useQuestById } from '../../hooks/quest.hook';
import secondsToTime from '../../utils/time-format';
import { createFeedback } from '../../middleware/feedback.fetching';
import { FeedbackCreate } from '../../models/feedback.model';
import { FeedbackItemComponent } from '../../components/feedback-item';
import './single-quiz.style.css';

interface FeedbackFormData {
  comment: string;
  rating: number;
}

const SingleQuiz: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FeedbackFormData>({
    comment: '',
    rating: 5,
  });

  const formSubmitHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!id) return;

      const feedbackData: FeedbackCreate = {
        questId: id,
        rating: formData.rating,
        comment: formData.comment || null,
        userId: '1', // TODO: get userId from auth
        userName: 'User', // TODO: get userName from auth
      };

      try {
        const response = await createFeedback(feedbackData);

        if (response) {
          console.log('Фідбек успішно створено:', response);
          setFormData({ comment: '', rating: 5 });
        } else {
          console.error('Не вдалося створити фідбек');
        }
      } catch (error) {
        console.error('Помилка при створенні фідбека:', error);
      }
    },
    [formData, id]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<ElementRef<'textarea'>>) => {
      setFormData((prev) => ({
        ...prev,
        comment: e.target.value,
      }));
    },
    []
  );

  const handleRatingChange = useCallback((rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  }, []);

  const { data: quest, isLoading, isError, error } = useQuestById(id ?? '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!quest) {
    return <h2>Квест не знайдено!</h2>;
  }

  return (
    <div className="single-quiz">
      <div className="quiz-header">
        <h1>{quest.title}</h1>
        <div className="quiz-meta">
          <div className="quiz-meta-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {secondsToTime(quest.timeLimit)}
          </div>
          <div className="quiz-meta-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {quest.questScore} балів
          </div>
        </div>
        <p className="quiz-description">{quest.description}</p>
      </div>

      <div className="quiz-tasks">
        {quest.questTasks?.map((task, index) => (
          <div key={task.id} className="task-card">
            <h3 className="task-title">
              Питання {index + 1}: {task.title}
            </h3>
            <p className="task-description">{task.description}</p>

            {task.media?.length > 0 && (
              <div className="task-media">
                {task.media.map((media) => (
                  <img key={media.id} src={media.url} alt={task.title} />
                ))}
              </div>
            )}

            <div className="task-options">
              {task.options?.map((option) => (
                <div key={option.id} className="task-option">
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="feedback-section">
        <h2 className="feedback-header">Відгуки</h2>

        <form className="feedback-form" onSubmit={formSubmitHandler}>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`rating-star ${rating <= formData.rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(rating)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="feedback-input"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Напишіть свій відгук..."
          />

          <button className="create-feedback-btn" type="submit">
            Надіслати
          </button>
        </form>

        <div className="feedback-list">
          {quest.feedbacks?.map((feedback) => (
            <FeedbackItemComponent key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>

      <button className="start-quiz-btn">Почати квест</button>
    </div>
  );
};

export default SingleQuiz;
