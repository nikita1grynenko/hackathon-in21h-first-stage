import React from "react";
import "./pagination.style.css";

const Pagination: React.FC = () => {
  return (
    <div className="pagination">
      <button className="pagination-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="pagination-numbers">
        <span className="active">1</span>
        <span className="dots">...</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span className="dots">...</span>
        <span>9</span>
      </div>

      <button className="pagination-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
