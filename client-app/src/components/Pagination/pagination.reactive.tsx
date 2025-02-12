import React, { useMemo } from "react";
import "./pagination.style.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({totalPages = 2, currentPage = 2, onPageChange}) => {
  const pages = useMemo(() => {
    const pagesNumbers: Array<number | string> = [1];
  
    if (totalPages === 1) return pagesNumbers;
  
    if (currentPage > 3) {
      pagesNumbers.push('...');
    }
  
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pagesNumbers.push(i);
    }
  
    if (currentPage < totalPages - 2) {
      pagesNumbers.push('...');
    }
  
    if (!pagesNumbers.includes(totalPages)) {
      pagesNumbers.push(totalPages);
    }
  
    console.log(pagesNumbers);
    return pagesNumbers;
  }, [totalPages, currentPage]);
  

  return (
    <div className="pagination">
      <button 
        className="pagination-btn"
        onChange={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
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
        {pages.map((page, index) => {
          if (!page) {
            return null;
          }

          const activePage = page === currentPage.toString() ? 'active' : '';
          const dots = page === '...' ? 'dots' : '';

          return (
          <button 
            key={index} 
            className={dots + ' ' + activePage} 
            onClick={() => !isNaN(+page) && onPageChange(+page)}
            disabled={isNaN(+page) || (!isNaN(+page) && +page === currentPage)}
          >
            {page}
          </button>
        )})}
      </div>

      <button 
        className="pagination-btn"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
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
