import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { QuizCardComponent } from '../quiz-card';
import './quiz-grid.style.css';
import { selectDifficulty } from '../../store/slices/filterSlice';

interface Quiz {
  id: number;
  title: string;
  tags: string[];
  author: string;
  date: string;
  points: number;
  avatar?: string;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Придумати ідею',
    tags: ['Тест', 'Змагання', 'Складний'],
    author: 'Dude',
    date: '06.02.2025',
    points: 100,
    avatar: undefined,
  },
  {
    id: 2,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
  {
    id: 3,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
  {
    id: 4,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
  {
    id: 5,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
  {
    id: 6,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
  {
    id: 7,
    title: 'Придумати дизайн',
    tags: ['Тест', 'Команда', 'Простий'],
    author: 'Dude',
    date: '07.02.2025',
    points: 80,
  },
];

const QuizGrid: React.FC = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const difficulty = useSelector(selectDifficulty);

  const filteredQuizzes = quizzes
    .filter((quiz) => {
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();

      return (
        quiz.title.toLowerCase().includes(searchLower) ||
        quiz.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        quiz.author.toLowerCase().includes(searchLower)
      );
    })
    .filter((quiz) => {
      if (difficulty === 'all') return true;

      const difficultyMap = {
        easy: 'Простий',
        medium: 'Середній',
        hard: 'Складний',
      };

      return quiz.tags.includes(difficultyMap[difficulty]);
    });

  return (
    <div className="quiz-grid">
      {filteredQuizzes.map((quiz) => (
        <QuizCardComponent key={quiz.id} {...quiz} />
      ))}
    </div>
  );
};

export default QuizGrid;
