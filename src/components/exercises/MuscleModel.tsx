"use client";

import Model, { type Muscle, type IMuscleStats } from "react-body-highlighter";
import { MuscleGroups } from "@/interfaces/workout/IWorkout";

export default function MuscleModel({
  musclesGroup,
  handleModelClick,
}: {
  musclesGroup: Muscle[];
  handleModelClick: (data: IMuscleStats | { muscle: MuscleGroups }) => void;
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
      {/* Muscle model container - stacks vertically on mobile, side by side on larger screens */}
      <div className="w-full bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-center">
        <div className="w-full sm:w-1/2 flex justify-center">
          <Model
            style={{ width: "100%", maxWidth: "20rem", padding: "0.5rem" }}
            highlightedColors={["#db2f2f"]}
            data={[{ name: "Biceps", muscles: musclesGroup }]}
            onClick={handleModelClick}
          />
        </div>

        <div className="w-full h-[2px] sm:w-[2px] sm:h-full bg-gray-700 my-4 sm:my-0 sm:mx-2" />

        <div className="w-full sm:w-1/2 flex justify-center">
          <Model
            style={{ width: "100%", maxWidth: "20rem", padding: "0.5rem" }}
            highlightedColors={["#3b82f6"]}
            type="posterior"
            data={[{ name: "Biceps", muscles: musclesGroup }]}
            onClick={handleModelClick}
          />
        </div>
      </div>

      {/* Muscle group buttons - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3  gap-2 sm:gap-3">
        {Object.values(MuscleGroups).map((muscleGroup) => (
          <button
            key={muscleGroup}
            type="button"
            onClick={() => handleModelClick({ muscle: muscleGroup })}
            className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                        border transition-all duration-200 touch-manipulation
                        ${
                          musclesGroup.includes(muscleGroup)
                            ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                            : "bg-slate-700/30 border-slate-600/50 text-slate-400 hover:bg-slate-700/50"
                        }`}
          >
            {muscleGroup
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </button>
        ))}
      </div>
    </div>
  );
}
