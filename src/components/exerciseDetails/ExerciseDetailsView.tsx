"use client";

import { useState } from "react";
import {
  LuX,
  LuPlay,
  LuDumbbell,
  LuTag,
  LuList,
  LuTarget,
} from "react-icons/lu";
import ExerciseTabs from "./ExerciseTabs";
import InstructionsTab from "./InstructionsTab";
import MusclesTab from "./MusclesTab";
import DemoTab from "./DemoTab";

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

  return (
    <div className="bg-[#1e1e24] max-w-4xl  rounded-lg overflow-hidden shadow-xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Exercise Details</h2>
        {modalCloseHandler && (
          <button
            onClick={modalCloseHandler}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <LuX size={20} />
          </button>
        )}
      </div>

      {/* Exercise Name */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">{exercise.name}</h1>
      </div>

      {/* Content Area */}
      <div className="p-4 min-h-[60vh]">
        <ExerciseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="bg-[#121218] rounded-lg p-4">
          {activeTab === "demo" && (
            <DemoTab
              videoUrl={exercise.videoUrl}
              equipment={exercise.equipment}
              category={exercise.category}
              name={exercise.name}
            />
          )}

          {activeTab === "muscles" && (
            <MusclesTab
              muscleGroup={exercise.muscleGroup}
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
