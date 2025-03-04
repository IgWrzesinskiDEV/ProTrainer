"use client";

import type { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { LuChevronDown } from "react-icons/lu";

export default function PlanSearchSelect({
  workoutPlans,
  selectedPlan,
  setSelectedPlan,
}: {
  workoutPlans: WorkoutPlan[];
  selectedPlan: WorkoutPlan | null;
  setSelectedPlan: Dispatch<SetStateAction<WorkoutPlan | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full sm:w-64" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex outline-none items-center justify-between w-full px-4 py-2.5 text-left bg-gray-800 border ${
          isOpen ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-700"
        } rounded-lg shadow-md transition-all duration-200 hover:bg-gray-750 focus:outline-none`}
      >
        <span
          className={`block truncate ${
            selectedPlan ? "text-white" : "text-gray-400"
          }`}
        >
          {selectedPlan ? selectedPlan.planName : "Select a plan"}
        </span>
        <LuChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 overflow-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 planScrollbar">
          <ul className="py-1">
            {workoutPlans.length === 0 ? (
              <li className="px-4 py-2.5 text-gray-400">No plans available</li>
            ) : (
              workoutPlans.map((plan) => (
                <li
                  key={plan._id}
                  className={`px-4 py-2.5 cursor-pointer transition-colors ${
                    selectedPlan?._id === plan._id
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsOpen(false);
                  }}
                >
                  {plan.planName}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
