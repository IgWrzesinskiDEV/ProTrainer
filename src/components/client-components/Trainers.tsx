"use client";

import { useState } from "react";
import ProfileWrapper from "../profile/ProfileWrapper";
import type { ITrainer } from "@/interfaces/trainers/ITrainer";
import TrainerPreview from "./trainersView/TrainerPreview";
import { LuSearch } from "react-icons/lu";

export default function TrainersList({ trainerList }: { trainerList: string }) {
  const [searchValue, setSearchValue] = useState("");
  const availableTrainers = JSON.parse(trainerList) as ITrainer[];
  const searchedClients = availableTrainers.filter((trainer: ITrainer) =>
    trainer.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ProfileWrapper title="Trainers" className="rounded-tr-none relative z-10">
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 pl-10 text-sm text-white  bg-gray-800 border border-gray-700 rounded-full focus:outline-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search trainers..."
          />
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="flex flex-wrap gap-5 flex-1 justify-center w-full">
          {searchedClients.map((trainer) => (
            <TrainerPreview trainer={trainer} key={trainer._id} />
          ))}
        </div>
      </div>
    </ProfileWrapper>
  );
}
