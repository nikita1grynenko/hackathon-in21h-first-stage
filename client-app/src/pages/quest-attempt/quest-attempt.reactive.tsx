import {
  useEffect,
  FC,
  useState,
  useCallback,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestById } from '../../hooks/query.hook';
import formatTime from '../../utils/time-format';
import './quest-attempt.style.css';
import useTimer from '../../hooks/timer.hook';
import formatTimer from '../../utils/timer-format';
import { AttemptSubmit } from '../../models/quest-attempt.model';
import { QuizTaskComponent } from '../../components/quiz-task';
import { createQuestAttempt } from '../../middleware/quest-attempt.fetching';

const QuestAttempt: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: quest, isLoading, isError, error } = useQuestById(id ?? '');
  const [timeSeconds, timerState] = useTimer(quest?.timeLimit ?? 0);
  const [answers, setAnswers] = useState<AttemptSubmit>({
    questId: id ?? '',
    answers: {},
  });

  const handleUpdateAnswers = (answer: Record<string, string[]>) => {
    setAnswers((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        ...answer,
      },
    }));
  };

  const completeAttempt = useCallback(() => {
    createQuestAttempt(answers);
    navigate(`/quiz/${id ?? ''}`);
  }, [answers, id, navigate]);

  useEffect(() => {
    document.title = `${quest?.title} — Quest attempt — QUIZIII`;
  }, [quest?.title]);

  useEffect(() => {
    if (timeSeconds <= 0) completeAttempt();
  }, [answers, completeAttempt, id, navigate, timeSeconds]);

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
          <QuizTaskComponent key={task.id} index={index} task={task} onSaveOption={handleUpdateAnswers} />
        ))}
      </div>

      <button className="submit-btn btn" onClick={completeAttempt}>
        Завершити квест
      </button>

      <div className='timer' style={{ 
        borderColor: timerState === 'EnoughTime' ? 'green' : timerState === 'RunningOut' ? 'yellow' : 'red',
        color: timerState === 'EnoughTime' ? 'green' : timerState === 'RunningOut' ? 'yellow' : 'red',
        backgroundColor: timerState === 'EnoughTime' ? '#a9ffa9' : timerState === 'RunningOut' ? '#c0cc5a' : '#671222',
      }}>{formatTimer(timeSeconds)}</div>
    </div>
  );
};

export default QuestAttempt;
