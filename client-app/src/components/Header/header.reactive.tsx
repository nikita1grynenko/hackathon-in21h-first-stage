import React from 'react';
import { Link } from 'react-router-dom';
import './header.style.css';
import { SearchBarComponent } from '../search-bar';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>
          <Link to={'/'}>Quiz Site 👍📰</Link>
        </h1>
      </div>
      <div className="center-container">
        <SearchBarComponent />
      </div>
      <div className="header-right">
        <div className="auth-buttons">
          <Link to="/login" className="auth-btn">
            Вхід
          </Link>
          <Link to="/register" className="auth-btn register">
            Реєстрація
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
