import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setAvatar } from '../../store/slices/authSlice';
import { faker } from '@faker-js/faker';
import './profile.style.css';

interface QuestHistory {
  id: string;
  title: string;
  date: string;
  score: number;
}

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Если у пользователя нет аватара, генерируем случайный
    if (!user?.avatar) {
      const randomAvatar = faker.image.avatar();
      dispatch(setAvatar(randomAvatar));
    }
  }, [dispatch, user?.avatar]);

  if (!user) {
    return <div>Користувач не знайдений</div>;
  }

  // Генерируем тестовые данные для истории
  const questHistory: QuestHistory[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    date: faker.date.recent().toLocaleDateString(),
    score: faker.number.int({ min: 50, max: 100 }),
  }));

  const stats = {
    completedQuests: faker.number.int({ min: 10, max: 50 }),
    totalScore: faker.number.int({ min: 1000, max: 5000 }),
    averageScore: faker.number.int({ min: 70, max: 95 }),
  };

  return (
    <div className="profile-container">
      <div className="profile-header animate-fade-in">
        <div className="avatar-container">
          <img
            src={user.avatar || faker.image.avatar()}
            alt={`${user.displayName}'s avatar`}
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.displayName}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-actions">
            <button
              className="action-button primary-button"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Сховати історію' : 'Історія проходження квестів'}
            </button>
            <button className="action-button secondary-button">
              Редагувати профіль
            </button>
          </div>
        </div>
      </div>

      <div
        className="profile-stats animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="stat-card">
          <div className="stat-value">{stats.completedQuests}</div>
          <div className="stat-label">Пройдено квестів</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalScore}</div>
          <div className="stat-label">Загальний рахунок</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.averageScore}%</div>
          <div className="stat-label">Середній результат</div>
        </div>
      </div>

      {showHistory && (
        <div
          className="quest-history animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <h2>Історія квестів</h2>
          <div className="history-list">
            {questHistory.map((quest) => (
              <div key={quest.id} className="history-item">
                <div className="quest-info">
                  <div className="quest-title">{quest.title}</div>
                  <div className="quest-date">{quest.date}</div>
                </div>
                <div className="quest-score">{quest.score} бал</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
