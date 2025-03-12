"use client";

import { useState } from "react";
import ListWraper from "../UI/list/ListWraper";
import { ExerciseDetails } from "../exerciseDetails/ExerciseDetailsView";
import { motion } from "framer-motion";
import { LuDumbbell } from "react-icons/lu";

import ExercisePreview from "./ExercisePreview";

export default function Exercises({ exercises }: { exercises: string }) {
  const [searchValue, setSearchValue] = useState("");
  const exercisesList: ExerciseDetails[] = JSON.parse(exercises);
  const searchedExercises = exercisesList.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <ListWraper
      title="Exercise Library"
      Icon={<LuDumbbell className="text-blue-400" />}
      text="Browse our exercise library"
      placeholder="Search exercises..."
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    >
      {searchedExercises.length > 0 ? (
        // <motion.div
        //   initial={{ opacity: 0, y: 20 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   exit={{ opacity: 0, y: 20 }}
        //   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        // >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {searchedExercises.map((exercise) => (
            <motion.div
              key={exercise._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ExercisePreview exercise={exercise} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        //</motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16"
        >
          {/* <div className="bg-slate-800/50 rounded-full p-4 mb-4">
            <RiUserAddLine className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-slate-300 mb-2">
            No invitations found
          </h3>
          <p className="text-sm sm:text-base text-slate-400 text-center max-w-md">
            {searchValue
              ? "No invitations match your search. Try different keywords."
              : "You don't have any pending invitations at the moment."}
          </p> */}
        </motion.div>
      )}
    </ListWraper>
  );
}
