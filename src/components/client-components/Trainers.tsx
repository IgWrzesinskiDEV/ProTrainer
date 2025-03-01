"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import type { ITrainer } from "@/interfaces/trainers/ITrainer";
import TrainerPreview from "./trainersView/TrainerPreview";
import SearchBar from "../UI/input/SearchBar";

export default function TrainersList({ trainerList }: { trainerList: string }) {
  const [searchValue, setSearchValue] = useState("");
  const availableTrainers = JSON.parse(trainerList) as ITrainer[];
  const searchedTrainers = availableTrainers.filter((trainer: ITrainer) =>
    trainer.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-7xl mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Find Your Perfect Trainer
        </h1>
        <p className="text-gray-400 mb-8">
          Browse through our expert trainers and find the perfect match for your
          fitness journey
        </p>
        <div className="relative w-full group">
          <SearchBar
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
            placeholder="Search trainers by name..."
          />
          <LuSearch
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 
                            transition-colors duration-300 group-focus-within:text-blue-500"
          />
        </div>
      </div>

      <div className="w-full">
        {searchedTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {searchedTrainers.map((trainer) => (
              <TrainerPreview trainer={trainer} key={trainer._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No trainers found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
