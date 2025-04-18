"use client";

import { useRef, useState } from "react";
import { LuArrowLeft, LuX } from "react-icons/lu";
import ExerciseTabs from "./ExerciseTabs";
import InstructionsTab from "./InstructionsTab";
import MusclesTab from "./MusclesTab";
import DemoTab from "./DemoTab";
import type { Muscle } from "react-body-highlighter";
import Link from "next/link";
import type { CustomExerciseDetails } from "@/interfaces/workout/IWorkout";
import { LuTrash2 } from "react-icons/lu";
import ModalUnstyled from "../UI/Modal";

import ConfirmDeleteCustomExercise from "../exercises/ConfirmDeleteCustomExercise";

export interface ExerciseDetails {
  _id: string;
  name: string;
  instructions?: string;
  equipment?: string;
  category?: string;
  muscleGroup?: string[];
  videoUrl?: string;
}

interface ExerciseDetailsProps {
  exerciseDetailJSON: string;
  modalCloseHandler?: () => void;
  isCustom?: boolean;
}

export default function ExerciseDetailsView({
  exerciseDetailJSON,
  modalCloseHandler,
  isCustom,
}: ExerciseDetailsProps) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const exercise = JSON.parse(exerciseDetailJSON) as
    | ExerciseDetails
    | CustomExerciseDetails;
  const [activeTab, setActiveTab] = useState<
    "demo" | "muscles" | "instructions"
  >("demo");
  const isModal = !!modalCloseHandler;
  function closeHandler() {
    modalRef.current?.close();
  }

  return (
    <>
      <div className="bg-[#1e1e24] portrait:h-[75vh]  h-[87vh] trainerDataSquareScrollbar scrollBarRectangle  lg:h-full z-10 rounded-lg overflow-y-auto shadow-xl w-full lg:w-3/4 lg:mx-auto">
        {/* Header */}
        <div className="flex  items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          {!isModal && (
            <Link
              href={`/dashboard/${isCustom ? "my-exercises" : "exercises"}`}
              className="group flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              aria-label="Back to exercises"
            >
              <LuArrowLeft
                size={20}
                className="transform group-hover:-translate-x-0.5 transition-transform duration-200"
              />
              <span className="ml-1.5 text-sm font-medium hidden sm:inline">
                Back
              </span>
            </Link>
          )}
          <h2 className="text-base  sm:text-lg font-thin text-white">
            Exercise Details
          </h2>
          {modalCloseHandler && (
            <button
              onClick={modalCloseHandler}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <LuX size={20} />
            </button>
          )}
        </div>

        {/* Exercise Name */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 break-words">
            {exercise.name}
          </h1>
          {isCustom && !isModal && (
            <button
              onClick={() => modalRef.current?.open()}
              className="flex items-center outline-none justify-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 text-sm font-medium"
              aria-label="Delete exercise"
            >
              <LuTrash2 size={16} className="" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 min-h-[50vh] md:min-h-[60vh]">
          <ExerciseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div className="bg-[#121218] rounded-lg p-3 sm:p-4">
            {activeTab === "demo" && (
              <DemoTab
                isModal={isModal}
                videoUrl={exercise.videoUrl}
                equipment={exercise.equipment}
                category={exercise.category}
                name={exercise.name}
              />
            )}

            {activeTab === "muscles" && (
              <MusclesTab
                muscleGroup={exercise.muscleGroup as Muscle[]}
                exerciseName={exercise.name}
              />
            )}

            {activeTab === "instructions" && (
              <InstructionsTab instructions={exercise.instructions} />
            )}
          </div>
        </div>
      </div>
      {isCustom && !isModal && (
        <ModalUnstyled ref={modalRef} isBackDropClickClose={false}>
          <ConfirmDeleteCustomExercise
            closeModal={closeHandler}
            exerciseId={exercise._id}
            exerciseName={exercise.name}
          />
        </ModalUnstyled>
      )}
    </>
  );
}
