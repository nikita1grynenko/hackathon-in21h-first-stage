import React from "react";
import "./searchBar.style.css";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Пошук квесту" className="search-input" />
    </div>
  );
};

export default SearchBar;
