import {
  useEffect,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
  ElementRef,
  FC,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestById } from '../../hooks/query.hook';
import formatTime from '../../utils/time-format';
import { createFeedback } from '../../middleware/feedback.fetching';
import { FeedbackCreate } from '../../models/feedback.model';
import FeedbackItem from '../../components/feedback-item/feedback-item.reactive';
import './single-quiz.style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface FeedbackFormData {
  comment: string;
  rating: number;
}

const SingleQuiz: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState<FeedbackFormData>({
    comment: '',
    rating: 5,
  });

  const { data: quest, isLoading, isError, error } = useQuestById(id ?? '');
  const [feedbacks, setFeedbacks] = useState(quest?.feedbacks ?? []);

  useEffect(() => {
    if (quest?.feedbacks) {
      setFeedbacks(quest.feedbacks);
    }
  }, [quest]);

  const formSubmitHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!id) return;

      const feedbackData: FeedbackCreate = {
        questId: id,
        rating: formData.rating,
        comment: formData.comment,
        userId: user?.id ?? '',
        userName: user?.userName ?? '',
      };

      try {
        const response = await createFeedback(feedbackData);
        if (response) {
          console.log('Фідбек успішно створено:', response);
          setFormData({ comment: '', rating: 5 });
          setFeedbacks((prev) => [...prev, response]);
        } else {
          console.error('Не вдалося створити фідбек');
        }
      } catch (error) {
        console.error('Помилка при створенні фідбека:', error);
      }
    },
    [formData.comment, formData.rating, id, user?.id, user?.userName]
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

  const handleDeleteFeedback = useCallback((id: string) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  }, []);

  useEffect(() => {
    document.title = `${quest?.title} — Quest — QUIZIII`;
  }, [quest?.title]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!quest) return <h2>Квест не знайдено!</h2>;

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
            {formatTime(quest.timeLimit)}
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
          {feedbacks.sort((prevFeedback, currentFeedback) => (+currentFeedback.createdAt - +prevFeedback.createdAt)).map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              onDelete={handleDeleteFeedback}
            />
          ))}
        </div>
      </div>

      <button className="start-quiz-btn" onClick={() => navigate("./attempt")}>Почати квест</button>
    </div>
  );
};

export default SingleQuiz;
