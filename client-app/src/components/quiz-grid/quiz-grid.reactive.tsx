import React from 'react';
import { useSelector } from 'react-redux';
import { QuizCardComponent } from '../quiz-card';
import './quiz-grid.style.css';
import { useQuests } from '../../hooks/quest.hook';
import { RootState } from '../../store/store';

const QuizGrid: React.FC = () => {
  const { data, isLoading, isError, error } = useQuests();
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const filteredQuizzes = data.filter((quiz) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (quiz.title && quiz.title.toLowerCase().includes(searchLower)) ||
      (quiz.tags &&
        quiz.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
      (quiz.author && quiz.author.toLowerCase().includes(searchLower))
    );
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
