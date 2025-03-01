import { LuSearch } from "react-icons/lu";
import SearchBar from "../input/SearchBar";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence } from "motion/react";

export default function ListWraper({
  children,
  title,
  text,
  Icon,
  searchValue,
  setSearchValue,
}: {
  children: React.ReactNode;
  title: string;
  text: string;
  Icon: React.ReactNode;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        {/* <div className="w-full text-center space-y-2">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          {Icon}
          {title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          {text}
        </p>
      </div>
      <div className="w-full max-w-md mx-auto relative group">
        <SearchBar
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.currentTarget.value)
          }
          placeholder="Search invites..."
        />
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div> */}
        <div className="w-full max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            {Icon}
            {title}
          </h1>
          <p className="text-gray-400 mb-8">{text}</p>
          <div className="relative w-full group">
            <SearchBar
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.currentTarget.value)
              }
              placeholder="Search clients by name..."
            />
            <LuSearch
              className="absolute left-5 top-1/2 transform -translate-y-1/2 
                           text-gray-500 h-5 w-5 transition-colors duration-300 
                           group-focus-within:text-blue-500"
            />
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
