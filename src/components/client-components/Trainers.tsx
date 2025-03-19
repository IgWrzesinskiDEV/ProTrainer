"use client";

import type { ITrainer } from "@/interfaces/trainers/ITrainer";
import TrainerPreview from "./trainersView/TrainerPreview";
import ListWrapper from "@/components/UI/list/ListWrapper";
import { LuUsers } from "react-icons/lu";

export default function TrainersList({ trainerList }: { trainerList: string }) {
  const availableTrainers = JSON.parse(trainerList) as ITrainer[];

  return (
    <ListWrapper
      items={availableTrainers}
      renderItem={(trainer) => (
        <TrainerPreview trainer={trainer} key={trainer._id} />
      )}
      itemsPerPage={9} // Adjusted for 3 columns layout
      placeholder="Search trainers by name..."
      title="Find Your Perfect Trainer"
      text="Browse through our expert trainers and find the perfect match for your fitness journey"
      Icon={<LuUsers className="text-blue-400" />}
      gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Custom grid layout
      fallBackText="trainers"
    />
  );
}
