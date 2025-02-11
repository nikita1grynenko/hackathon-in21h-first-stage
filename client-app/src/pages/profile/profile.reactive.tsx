import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { faker } from '@faker-js/faker';
import './profile.style.css';

interface QuestHistory {
  id: string;
  title: string;
  date: string;
  score: number;
}

export const ProfilePage: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  // Отримуємо дані користувача з Redux
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const userAvatar = faker.image.avatar();
  const userName = user?.userName || 'Користувач';
  const userEmail = user?.email || 'email@example.com';

  const questHistory: QuestHistory[] = Array.from({ length: 5 }, () => ({
    id: 'uuid',
    title: 'Назва квесту',
    date: new Date().toLocaleDateString(),
    score: Math.floor(Math.random() * 51) + 50,
  }));

  const stats = {
    completedQuests: Math.floor(Math.random() * 41) + 10,
    totalScore: Math.floor(Math.random() * 4001) + 1000,
    averageScore: Math.floor(Math.random() * 26) + 70,
  };

  return (
    <div className="profile-container">
      <div className="profile-header animate-fade-in">
        <div className="avatar-container">
          <img src={userAvatar} alt="User avatar" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userName}</h1>
          <p className="profile-email">{userEmail}</p>
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
