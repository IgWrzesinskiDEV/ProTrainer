"use client";

import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 2);
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-8 w-full">
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* First page button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md transition-colors ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          }`}
          aria-label="Go to first page"
        >
          <LuChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md transition-colors ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          }`}
          aria-label="Go to previous page"
        >
          <LuChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-gray-400"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={index}
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md transition-colors ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          }`}
          aria-label="Go to next page"
        >
          <LuChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Last page button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md transition-colors ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          }`}
          aria-label="Go to last page"
        >
          <LuChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
