"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import SearchBar from "../input/SearchBar";
import PaginationControls from "../pagination/PaginationControls";
import { AnimatePresence, motion } from "framer-motion";

interface ListWrapperProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  placeholder?: string;
  title?: string;
  text?: string;
  Icon?: React.ReactNode;
  isCustom?: boolean;
  onAddCustom?: () => void;
  gridClassName?: string; // Add this line
}

export default function ListWrapper<T>({
  items,
  renderItem,
  itemsPerPage = 12,
  placeholder = "Search...",
  title,
  text,
  Icon,
  isCustom,
  onAddCustom,
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", // Add this line with default value
}: ListWrapperProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    const filtered = items.filter((item) => {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when search value changes
  }, [items, searchValue]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of list for better UX
    window.scrollTo({
      top: document.getElementById("item-list")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        {(title || text) && (
          <div className="w-full max-w-2xl mx-auto text-center">
            {title && (
              <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                {Icon}
                {title}
              </h1>
            )}
            {text && <p className="text-gray-400 mb-8">{text}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl mx-auto">
          <div className="relative w-full group">
            <SearchBar
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.currentTarget.value)
              }
              placeholder={placeholder}
            />
            <LuSearch
              className="absolute left-5 top-1/2 transform -translate-y-1/2 
                       text-gray-500 h-5 w-5 transition-colors duration-300 
                       group-focus-within:text-blue-500"
            />
          </div>

          {isCustom && onAddCustom && (
            <button
              onClick={onAddCustom}
              className="flex items-center justify-center text-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-lg whitespace-nowrap sm:ml-4 w-full sm:w-auto"
            >
              <span className="block text-center">Add Custom</span>
            </button>
          )}
        </div>

        <div id="item-list" className="w-full">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full"
              >
                <div className={`grid gap-4 sm:gap-6 ${gridClassName}`}>
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderItem(item)}
                    </motion.div>
                  ))}
                </div>

                {/* Only show pagination if we have more than one page */}
                {totalPages > 1 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}

                {/* Item count indicator */}
                <div className="text-center text-sm text-gray-400 mt-4">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredItems.length)} of{" "}
                  {filteredItems.length} items
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 sm:py-16"
              >
                <div className="bg-slate-800/50 rounded-full p-4 mb-4">
                  {Icon || <LuSearch className="w-8 h-8 text-slate-400" />}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-300 mb-2">
                  No items found
                </h3>
                <p className="text-sm sm:text-base text-slate-400 text-center max-w-md">
                  {searchValue
                    ? "No items match your search. Try different keywords."
                    : "There are no items available at the moment."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
