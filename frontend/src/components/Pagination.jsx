import React from 'react';
import { useStore } from '../context/StoreContext';
import './Pagination.css';

export default function Pagination() {
  const { currentPage, totalPages, goToPage, prevPage, nextPage } = useStore();

  if (totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => goToPage(1)} className="pagination-btn">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} className="pagination-btn">
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="pagination-nav-btn"
      >
        ← Previous
      </button>

      <div className="pagination-pages">
        {renderPageNumbers()}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="pagination-nav-btn"
      >
        Next →
      </button>
    </div>
  );
}
