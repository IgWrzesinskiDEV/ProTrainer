"use client";

import { useRef, useState } from "react";
import ListWraper from "../UI/list/ListWraper";
import { ExerciseDetails } from "../exerciseDetails/ExerciseDetailsView";
import { motion } from "framer-motion";
import { LuDumbbell } from "react-icons/lu";

import ExercisePreview from "./ExercisePreview";
import ModalUnstyled from "../UI/Modal";
import AddCustomExerciseModal from "./AddCustomExerciseModal";
import { CustomExerciseDetails } from "@/interfaces/workout/IWorkout";

export default function Exercises({
  exercises,
  isCustom,
}: {
  exercises: string;
  isCustom: boolean;
}) {
  const [searchValue, setSearchValue] = useState("");
  const exercisesList: ExerciseDetails[] | CustomExerciseDetails[] =
    JSON.parse(exercises);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  function openModal() {
    modalRef.current?.open();
  }

  function closeModal() {
    modalRef.current?.close();
  }
  const searchedExercises = exercisesList.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <ListWraper
        title={isCustom ? "Your exercise Library" : "Exercise Library"}
        Icon={<LuDumbbell className="text-blue-400" />}
        text={
          isCustom ? "Browse your exercises " : "Browse our exercise library"
        }
        placeholder="Search exercises..."
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isCustom={isCustom}
        onAddCustom={openModal}
      >
        {searchedExercises.length > 0 ? (
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
                <ExercisePreview exercise={exercise} isCustom={isCustom} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 sm:py-16"
          >
            <div className="bg-slate-800/50 rounded-full p-4 mb-4">
              <LuDumbbell className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-slate-300 mb-2">
              No exercises found
            </h3>
            <p className="text-sm sm:text-base text-slate-400 text-center max-w-md">
              {searchValue
                ? "No exercises match your search. Try different keywords."
                : "There are no exercises available at the moment."}
            </p>
          </motion.div>
        )}
      </ListWraper>
      <ModalUnstyled ref={modalRef}>
        <AddCustomExerciseModal closeModal={closeModal} />
      </ModalUnstyled>
    </>
  );
}
