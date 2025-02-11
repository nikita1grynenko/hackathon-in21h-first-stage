import React from 'react';
import { QuizCardComponent } from '../quiz-card';
import './quiz-grid.style.css';
import { useQuests } from '../../hooks/quest.hook';

const QuizGrid: React.FC = () => {
  const { data, isLoading, isError, error } = useQuests();
  
  // const searchQuery = useSelector(
  //   (state: RootState) => state.search.searchQuery
  // );
  // const difficulty = useSelector(selectDifficulty);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  // * TODO: Update filtering logic

  // const filteredQuizzes = data
  //   .filter((quiz) => {
  //     if (!searchQuery) return true;

  //     const searchLower = searchQuery.toLowerCase();

  //     return (
  //       quiz.title.toLowerCase().includes(searchLower) ||
  //       quiz.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
  //       quiz.author.toLowerCase().includes(searchLower)
  //     );
  //   })
  //   .filter((quiz) => {
  //     if (difficulty === 'all') return true;

  //     const difficultyMap = {
  //       easy: 'Простий',
  //       medium: 'Середній',
  //       hard: 'Складний',
  //     };

  //     return quiz.tags.includes(difficultyMap[difficulty]);
  //   });

  return (
    <div className="quiz-grid">
      {data.map((quiz) => (
        <QuizCardComponent key={quiz.id} {...quiz} />
      ))}
    </div>
  );
};

export default QuizGrid;
