"use client";

import { useState } from "react";
import { LuX } from "react-icons/lu";
import ExerciseTabs from "./ExerciseTabs";
import InstructionsTab from "./InstructionsTab";
import MusclesTab from "./MusclesTab";
import DemoTab from "./DemoTab";
import { Muscle } from "react-body-highlighter";

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
}

export default function ExerciseDetailsView({
  exerciseDetailJSON,
  modalCloseHandler,
}: ExerciseDetailsProps) {
  const exercise = JSON.parse(exerciseDetailJSON) as ExerciseDetails;
  const [activeTab, setActiveTab] = useState<
    "demo" | "muscles" | "instructions"
  >("demo");
  const isModal = !!modalCloseHandler;

  return (
    <div className="bg-[#1e1e24] z-10 rounded-lg overflow-hidden shadow-xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-700">
        <h2 className="text-base sm:text-lg font-thin text-white">
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
  );
}
