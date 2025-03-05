"use client";

import { useState, useEffect, useRef } from "react";
import InputFloatingLabel from "@/components/UI/input/InputWithFloatingLabel";
import type {
  Exercise,
  ExerciseDetailsShort,
  WeekDays,
} from "@/interfaces/workout/IWorkout";
import type { ExerciseDetails } from "@/interfaces/workout/IWorkout";
import { Popper } from "@mui/material";
import ExerciseDetailsLink from "@/components/UI/links/ExerciseDetailsLink";

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
  inputClassName?: string;
  labelClassName?: string;
}

export default function ExerciseSelecter({
  defaultValue = "",
  exerciseNumber,
  updateExercise,
  availableExercises,
  weekDay,
  inputClassName,
  labelClassName,
}: ExerciseSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [filteredExercises, setFilteredExercises] =
    useState<ExerciseDetails[]>(availableExercises);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Close dropdown when clicking outside
    document.addEventListener("mousedown", handleClickOutside);

    // Close dropdown when scrolling on mobile
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
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

  return (
    <div ref={wrapperRef} className="relative">
      <div ref={anchorRef} className="relative z-0 flex items-center gap-2">
        <InputFloatingLabel
          forHTMLLabel={`${weekDay}-${exerciseNumber}-exerciseName`}
          label="Exercise name"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            updateExercise(exerciseNumber, "name", e.target.value, "");
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          classNameAdded={`${inputClassName} touch-manipulation`}
          classNameLabel={labelClassName}
        />

        {isPreDefinedExercise() && (
          <ExerciseDetailsLink exerciseId={preDefinedExerciseId} />
        )}
      </div>

      {anchorRef.current && (
        <Popper
          open={isOpen}
          ref={popperRef}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          slotProps={{
            root: {
              className: `relative z-[1001] w-full max-w-[calc(100vw-2rem)] md:max-w-none`,
            },
          }}
          modifiers={[
            { name: "flip", enabled: true },
            { name: "preventOverflow", enabled: true },
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
          <div className="absolute z-20 overflow-y-auto w-full mt-1 bg-slate-800 rounded-md shadow-lg max-h-60 trainerDataSquareScrollbar planScrollbar">
            {filteredExercises.length > 0 ? (
              <ul className="py-1">
                {filteredExercises.map((exercise) => (
                  <li
                    key={exercise._id}
                    onClick={() => handleSelect(exercise)}
                    className="px-4 py-3 hover:bg-slate-700 active:bg-slate-600 cursor-pointer text-white text-sm md:text-base"
                  >
                    {exercise.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-gray-400 text-sm">
                No matches found. You can use this custom exercise name.
              </div>
            )}
          </div>
        </Popper>
      )}
    </div>
  );
}
