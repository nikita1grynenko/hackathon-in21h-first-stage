import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty } from '../../store/slices/filterSlice';
import { RootState } from '../../store/store';
import './filter.style.css';

interface FilterProps {
  current: number;
  perPage: number;
  total: number;
}

const Filter: React.FC<FilterProps> = ({ current, perPage, total }) => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.filter.difficulty);

  const handleDifficultyClick = () => {
    const difficultyOrder: ['all', 'easy', 'medium', 'hard'] = [
      'all',
      'easy',
      'medium',
      'hard',
    ];
    const currentIndex = difficultyOrder.indexOf(difficulty);
    const nextDifficulty =
      difficultyOrder[(currentIndex + 1) % difficultyOrder.length];
    dispatch(setDifficulty(nextDifficulty));
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${difficulty !== 'all' ? 'active' : ''}`}
          onClick={handleDifficultyClick}
        >
          Складність:
          {difficulty === 'all'
            ? 'Всі'
            : difficulty === 'easy'
              ? 'Простий'
              : difficulty === 'medium'
                ? 'Середній'
                : 'Складний'}
        </button>
      </div>
      <div className="quiz-counter">
        <span>Квести</span>
        <strong>
          {current}-{Math.min(current + perPage-1, total)}
        </strong>
        із <strong>{total}</strong>
      </div>
    </div>
  );
};

export default Filter;
