import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setAvatar } from '../../store/slices/auth.slice';
import { faker } from '@faker-js/faker';
import './profile.style.css';
import { useQuestHistory } from '../../hooks/query.hook';
import formatDateTime from '../../utils/date-time-format';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showHistory, setShowHistory] = useState(false);

  const {
    data: questHistory = [],
    isLoading,
    isError,
    error,
  } = useQuestHistory();

  const stats = useMemo(
    () => ({
      completedQuests: questHistory.length,
      totalScore: questHistory.reduce((sum, quest) => sum + quest.userScore, 0),
      averageScore: Math.round(
        questHistory.reduce((sum, quest) => sum + quest.userScore, 0) /
          questHistory.length
      ),
    }),
    [questHistory]
  );

  useEffect(() => {
    if (!user?.avatar) {
      const randomAvatar = faker.image.avatar();
      dispatch(setAvatar(randomAvatar));
    }
  }, [dispatch, user?.avatar]);

  useEffect(() => {
    document.title = `${user?.userName} — Profile — QUIZIII`;
  }, [user?.userName]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!user) {
    return <div>Користувач не знайдений</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header animate-fade-in">
        <div className="avatar-container">
          <img
            src={user.avatar || faker.image.avatar()}
            alt={`${user.userName}'s avatar`}
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.userName}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-actions">
            <button
              className="action-button primary-button"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Сховати історію' : 'Історія проходження квестів'}
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
      </div>

      {showHistory && (
        <div
          className="quest-history animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <h2>Історія квестів</h2>
          <div className="history-list">
            {questHistory.map((questItem) => (
              <div key={questItem.id} className="history-item">
                <div className="quest-info">
                  <div className="quest-title">{questItem.quest && questItem.quest.title}</div>
                  <div className="quest-date">
                    {questItem.completedAt && formatDateTime(questItem.completedAt)}
                  </div>
                </div>
                <div className="quest-score">{questItem.userScore} бал</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
