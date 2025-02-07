import React from "react";
import "./header.style.css";
import SearchBar from "./../SearchBar/searchBar.reactive";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>
          <Link to={"/"}>Quiz Site 👍📰</Link>
        </h1>
      </div>
      <div className="header-right">
        <SearchBar />
        <span className="username">TheCoolestDude</span>
      </div>
    </header>
  );
};

export default Header;
