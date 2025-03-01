import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import { Dispatch, SetStateAction, useState } from "react";
import * as React from "react";

import { LuChevronDown } from "react-icons/lu";

export default function PlanSearchSelect({
  workoutPlans,
  selectedPlanId,
  setSelectedPlanId,
}: {
  workoutPlans: WorkoutPlan[];
  selectedPlanId: string | null;
  setSelectedPlanId: Dispatch<SetStateAction<string | null>>;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative w-full md:w-auto min-w-[240px]">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-700 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 shadow-lg"
      >
        <span className="flex items-center gap-2">
          {selectedPlanId ? (
            <span className="font-medium truncate">
              {
                workoutPlans.find((plan) => plan._id === selectedPlanId)
                  ?.planName
              }
            </span>
          ) : (
            <span className="text-gray-400">Select a plan</span>
          )}
        </span>
        <LuChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          <div className="max-h-60 overflow-y-auto py-1 planScrollbar trainerDataSquareScrollbar">
            {workoutPlans.map((plan) => (
              <button
                key={plan._id}
                onClick={() => {
                  setSelectedPlanId(plan._id);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors duration-150 ${
                  plan._id === selectedPlanId
                    ? "bg-blue-500/30 text-blue-100"
                    : "text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{plan.planName}</span>
                  {plan._id === selectedPlanId && (
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {plan.days.reduce(
                    (acc, currentVal) =>
                      !currentVal.isRestDay ? acc + 1 : acc,
                    0
                  )}{" "}
                  training days •{" "}
                  {plan.days[0]?.exercises[0]?.weekData?.length || 0} weeks
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
