import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './test-completion.style.css';

const TestCompletion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, totalQuestions, questTitle } = location.state || {
    correctAnswers: 0,
    totalQuestions: 0,
    questTitle: 'Тест',
  };

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="test-completion">
      <h1>Тест завершено</h1>
      <h2>{questTitle}</h2>

      <div className="result-stats">
        <p>
          Правильних відповідей: {correctAnswers} з {totalQuestions}
        </p>
        <p className="percentage">Результат: {percentage}%</p>
      </div>

      <div className="result-message">
        {percentage >= 80 && <p>Відмінний результат! 🎉</p>}
        {percentage >= 60 && percentage < 80 && <p>Добрий результат! 👍</p>}
        {percentage < 60 && <p>Спробуйте ще раз! 💪</p>}
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/')}>На головну</button>
        <button onClick={() => navigate(-2)} className="secondary">
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
};

export default TestCompletion;
