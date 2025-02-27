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
import { Popper } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function ExerciseSelecter({
  defaultValue = "",
  exerciseNumber,
  updateExercise,
  availableExercises,
  weekDay,
}: ExerciseSelectorProps) {
  //     getInputProps,
  //     getPopupIndicatorProps,
  //     getClearProps,
  //     getListboxProps,
  //     getOptionProps,
  //     dirty,
  //     id,
  //     popupOpen,
  //     focused,
  //     anchorEl,
  //     setAnchorEl,
  //     groupedOptions,
  //   } = useAutocomplete({
  //     options: availableExercises,
  //     isOptionEqualToValue: (option, value) => option.name === value.name,
  //     getOptionLabel: (option) => option.name,
  //     componentName: "BaseAutocompleteIntroduction",
  //   });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const [filteredExercises, setFilteredExercises] =
    useState<ExerciseDetails[]>(availableExercises);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
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

    setIsOpen(false);
  };

  const isPreDefinedExercise = () => {
    return availableExercises.some(
      (ex) => ex.name.toLowerCase() === searchTerm.toLowerCase()
    );
  };
  const preDefinedExerciseId = availableExercises.find(
    (ex) => ex.name.toLowerCase() === searchTerm.toLowerCase()
  )?._id;
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef}>
      <>
        <div
          ref={anchorRef}
          className="relative  bg-slate-700 z-0 flex items-center gap-2"
        >
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

          {isPreDefinedExercise() && (
            // <button
            //   onClick={() => router.push(`?exercise=${preDefinedExerciseId}`)}
            //   className="flex-shrink-0 p-2 hover:bg-slate-600 rounded-full transition-colors"
            //   title="View exercise details"
            // >
            //   <LuInfo className="h-5 w-5 text-blue-400 " />
            // </button>
            <Link
              href={`/dashboard/exercises/${preDefinedExerciseId}`}
              className="flex-shrink-0 p-2 hover:bg-slate-600 rounded-full transition-colors"
              title="View exercise details"
            >
              <LuInfo className="h-5 w-5 text-blue-400 " />
            </Link>
          )}
        </div>

        {anchorRef && (
          <Popper
            open={isOpen}
            ref={popperRef}
            anchorEl={anchorRef.current}
            slotProps={{
              root: {
                className: `relative z-[1001]  w-60`, // z-index: 1001 is needed to override ComponentPageTabs with z-index: 1000
              },
            }}
            modifiers={[
              { name: "flip", enabled: false },
              { name: "preventOverflow", enabled: false },
              {
                name: "sameWidth",
                enabled: true,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: ({ state }) => {
                  // Set the width of popper to match the width of the reference element
                  state.styles.popper.width = `${state.rects.reference.width}px`;
                },
                effect: ({ state }) => {
                  // This runs on initial mount and when the reference element changes size
                  state.elements.popper.style.width = `${
                    (state.elements.reference as HTMLElement).offsetWidth
                  }px`;
                },
              },
            ]}
          >
            <div className=" absolute z-20 overflow-y-scroll w-full mt-1 bg-slate-800 rounded-md shadow-lg max-h-60  trainerDataSquareScrollbar planScrollbar">
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
          </Popper>
        )}
      </>

      {/* {selectedExercise && (
    //     <ExerciseDetailsModal
    //       exercise={selectedExercise}
    //       isOpen={isModalOpen}
    //       onClose={() => setIsModalOpen(false)}
    //     />
    //   )} */}
    </div>
  );
}
