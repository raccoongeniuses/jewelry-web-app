'use client';

import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 7 
}: PaginationProps) {
  const [showFirstEllipsis, setShowFirstEllipsis] = useState(false);
  const [showLastEllipsis, setShowLastEllipsis] = useState(false);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle section
      const middleStart = Math.max(2, currentPage - 1);
      const middleEnd = Math.min(totalPages - 1, currentPage + 1);
      
      // Add first ellipsis if needed
      if (middleStart > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = middleStart; i <= middleEnd; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }
      
      // Add last ellipsis if needed
      if (middleEnd < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page (if more than 1 page)
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-wrapper">
      <nav className="navigation pagination" role="navigation">
        <div className="nav-links">
          {/* Previous Button */}
          <button
            className={`prev page-numbers ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <IoIosArrowBack />
            <span className="sr-only">Previous</span>
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((pageNumber, index) => (
            <span key={index}>
              {pageNumber === '...' ? (
                <span className="page-numbers dots" aria-hidden="true">...</span>
              ) : (
                <button
                  className={`page-numbers ${currentPage === pageNumber ? 'current' : ''}`}
                  onClick={() => onPageChange(pageNumber as number)}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              )}
            </span>
          ))}

          {/* Next Button */}
          <button
            className={`next page-numbers ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <span className="sr-only">Next</span>
            <IoIosArrowForward />
          </button>
        </div>
      </nav>
      
      {/* Page Info */}
      <div className="pagination-info">
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
