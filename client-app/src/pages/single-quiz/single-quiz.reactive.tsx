import { type FC, ChangeEvent, ElementRef, FormEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v6 } from 'uuid';
import { useQuestById } from '../../hooks/quest.hook';
import formatDateTime from '../../utils/date-time-format';
import secondsToTime from '../../utils/time-format';
import { createFeedback } from '../../middleware/feedback.fetching';
import { Feedback } from '../../models/feedback.model';
import './single-quiz.style.css';

interface SingleQuizFeedbackProps { 
  comment: string; 
}

const SingleQuiz: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<SingleQuizFeedbackProps>({ comment: '' });
  
    const formSubmitHandler = useCallback((e: FormEvent) => {
      e.preventDefault();
      if (!id) return;

      console.log(
      localStorage.getItem('token'));

      createFeedback({
        id: v6(),
        comment: formData.comment,
        userName: 'Демо юзер',
        createdAt: new Date(),
        questId: id,
        userId: '00000000-0000-0000-0000-000000000000',
        rating: 5,
      } satisfies Feedback);
      setFormData({ comment: '' });
    }, [formData, id]);
  
    const handleInputChange = useCallback((e: ChangeEvent<ElementRef<"textarea">>) => {
      const data = e.target.value;
      setFormData({ comment: data });
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
          <textarea
            className="feedback-input"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Напишіть свій відгук..."
          />
          <button className="create-feedback-btn" type="submit">Надіслати</button>
        </form>

        <div className="feedback-list">
          {quest.feedbacks?.map((feedback) => {
            if (!feedback) return null;
            const [date, time] = formatDateTime(new Date(feedback.createdAt));

            return (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-meta">
                  <span>Оцінка: {feedback.rating}/5</span>
                  <span>
                    {date} {time}
                  </span>
                </div>
                <p className="feedback-text">{feedback.comment}</p>
              </div>
            );
          })}
        </div>
      </div>

      <button className="start-quiz-btn">Почати квест</button>
    </div>
  );
};

export default SingleQuiz;
