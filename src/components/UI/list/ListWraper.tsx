"use client";

import type React from "react";

import { LuSearch, LuPlus } from "react-icons/lu";
import SearchBar from "../input/SearchBar";
import type { Dispatch, SetStateAction } from "react";
import { AnimatePresence } from "motion/react";

export default function ListWraper({
  children,
  title,
  text,
  placeholder,
  Icon,
  searchValue,
  setSearchValue,
  isCustom,
  onAddCustom,
}: {
  children: React.ReactNode;
  title: string;
  text: string;
  placeholder?: string;
  Icon: React.ReactNode;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  isCustom?: boolean;
  onAddCustom?: () => void;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            {Icon}
            {title}
          </h1>
          <p className="text-gray-400 mb-8">{text}</p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
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
                <LuPlus className="h-5 w-5" />
                <span className="block text-center ">Add Custom Exercise</span>
              </button>
            )}
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
