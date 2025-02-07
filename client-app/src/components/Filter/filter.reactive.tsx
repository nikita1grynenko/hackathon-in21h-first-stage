import React from "react";
import "./filter.style.css";

interface FilterProps {
  current: number;
  total: number;
}

const Filter: React.FC<FilterProps> = ({ current, total }) => {
  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button className="filter-btn">Тип ⬇</button>
        <button className="filter-btn active">Складність ⬇</button>
      </div>
      <div className="quiz-counter">
        Квести{" "}
        <strong>
          {current}-{Math.min(current + 5, total)}
        </strong>{" "}
        із <strong>{total}</strong>
      </div>
    </div>
  );
};

export default Filter;
