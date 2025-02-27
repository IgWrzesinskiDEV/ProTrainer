"use client";

import { useState, useEffect, useRef } from "react";
import { LuInfo } from "react-icons/lu";

import ExerciseDetailsModal from "./ExerciseDetailsModal";
import InputFloatingLabel from "@/components/UI/input/InputWithFloatingLabel";
import {
  Exercise,
  ExerciseDetailsShort,
  WeekDays,
} from "@/interfaces/workout/IWorkout";
import { ExerciseDetails } from "@/interfaces/workout/IWorkout";

interface ExerciseSelectorProps {
  defaultValue?: string;
  exerciseNumber: number;
  updateExercise: (
    exerciseNumber: number,
    field: keyof Exercise,
    value: string,
    exerciseDetailsIdValue?: string
  ) => void;
  weekDay: WeekDays;
  availableExercises: ExerciseDetailsShort[];
}

export default function ExerciseSelectorOld({
  defaultValue = "",
  exerciseNumber,
  updateExercise,
  availableExercises,
  weekDay,
}: ExerciseSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  //const [selectedExercise, setSelectedExercise] =
  // useState<ExerciseDetails | null>(null);

  const [filteredExercises, setFilteredExercises] =
    useState<ExerciseDetails[]>(availableExercises);
  const wrapperRef = useRef<HTMLDivElement>(null);
  //console.log(selectedExercise, "selectedExercise");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = availableExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchTerm, availableExercises]);

  const handleSelect = (exerciseDetails: ExerciseDetails) => {
    updateExercise(
      exerciseNumber,
      "name",
      exerciseDetails.name,
      exerciseDetails._id
    );
    setSearchTerm(exerciseDetails.name);
    //setSelectedExercise(exerciseDetails);
    //onSelect(exerciseDetails.name);
    setIsOpen(false);
  };

  const isPreDefinedExercise = () => {
    return availableExercises.some(
      (ex) => ex.name.toLowerCase() === searchTerm.toLowerCase()
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full  ">
      <div className="relative  bg-slate-700 z-0 flex items-center gap-2">
        <InputFloatingLabel
          forHTMLLabel={`${weekDay}-${exerciseNumber}-exerciseName`}
          label="Exercise name"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            updateExercise(exerciseNumber, "name", e.target.value, "");
            setSearchTerm(e.target.value);

            setIsOpen(true);
            // if (!e.target.value) {
            //   setSelectedExercise(null);
            // }
          }}
        />
        {/* <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);

            setIsOpen(true);
            if (!e.target.value) {
              setSelectedExercise(null);
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search or enter exercise name"
          className="w-full bg-slate-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        {isPreDefinedExercise() && (
          <button
            // onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 p-2 hover:bg-slate-600 rounded-full transition-colors"
            title="View exercise details"
          >
            <LuInfo className="h-5 w-5 text-blue-400 " />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className=" absolute z-20 overflow-y-scroll w-full mt-1 bg-slate-800 rounded-md shadow-lg max-h-60  trainerDataSquareScrollbar planScrollbar"
          //className="fixed z-[100] w-[calc(100%-2rem)] md:w-auto min-w-[200px] mt-1 bg-slate-800 rounded-md shadow-lg max-h-60 overflow-auto"
          style={{
            left: wrapperRef.current
              ? `${wrapperRef.current.getBoundingClientRect().left}px`
              : "0",
            top: wrapperRef.current
              ? `${wrapperRef.current.getBoundingClientRect().bottom + 5}px`
              : "0",
          }}
        >
          {filteredExercises.length > 0 ? (
            <ul className="  py-1 ">
              {filteredExercises.map((exercise) => (
                <li
                  key={exercise._id}
                  onClick={() => handleSelect(exercise)}
                  className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-white"
                >
                  {exercise.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-400">
              No matches found. You can use this custom exercise name.
            </div>
          )}
        </div>
      )}

      {/* {selectedExercise && (
        <ExerciseDetailsModal
          exercise={selectedExercise}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}
    </div>
  );
}
