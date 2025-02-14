import React from 'react';
import { useSelector } from 'react-redux';
import { QuizCardComponent } from '../quiz-card';
import './quiz-grid.style.css';
import { useQuests } from '../../hooks/query.hook';
import { RootState } from '../../store/store';

interface QuizGridProps {
  currentPage: number;
}

const QuizGrid: React.FC<QuizGridProps> = ({currentPage}) => {
  const { data, isLoading, isError, error } = useQuests(currentPage);
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  if (isLoading) { 
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading...
      </div>
    );
  }
  
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  
  if (!data) {
    return <div className="no-data">No data</div>;
  }  

  const filteredQuizzes = data.filter((quiz) => {
    const searchLower = searchQuery.toLowerCase();
    const tags: string[] = [quiz.difficulty, quiz.topic];
    return (
      (quiz.title && quiz.title.toLowerCase().includes(searchLower)) ||
      (tags.some((tag) => tag.toLowerCase().includes(searchLower)))
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
