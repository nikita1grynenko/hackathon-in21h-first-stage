import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.style.css';
import { SearchBarComponent } from '../search-bar';
import { ProfileComponent } from '../profile';
import { CreateQuizComponent } from '../create-quest-btn';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };
  return (
    <header className="header">
      <div className="header-left">
        <h1>
          <Link to={'/'}>Quiz Site 👍📰</Link>
        </h1>

        <CreateQuizComponent onClick={handleCreateQuiz} />
      </div>
      <div className="center-container">
        <SearchBarComponent />
      </div>
      <div className="header-right">
        <div className="auth-buttons">
          <ProfileComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;
