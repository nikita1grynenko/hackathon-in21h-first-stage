import React from "react";
import "./pagination.style.css";

const Pagination: React.FC = () => {
  return (
    <div className="pagination">
      <span>1</span> ... <span>3</span> <span>4</span> ... <span>9</span>
    </div>
  );
};

export default Pagination;
