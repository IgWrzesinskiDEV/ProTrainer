"use client";

import type { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { LuChevronDown, LuCalendar, LuCheck } from "react-icons/lu";

export default function PlanSelect({
  workoutPlans,
  selectedPlanId,
  setSelectedPlanId,
  setSelectedPlan,
}: {
  workoutPlans: WorkoutPlan[];
  selectedPlanId: string | null;
  setSelectedPlanId?: Dispatch<SetStateAction<string | null>>;
  setSelectedPlan?: Dispatch<SetStateAction<WorkoutPlan | null>>;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDropdownOpen]);

  // Get selected plan details
  const selectedPlan = workoutPlans.find((plan) => plan._id === selectedPlanId);
  const trainingDays = selectedPlan
    ? selectedPlan.days.reduce(
        (acc, day) => (!day.isRestDay ? acc + 1 : acc),
        0
      )
    : 0;
  const weekCount = selectedPlan?.days[0]?.exercises[0]?.weekData?.length || 0;

  return (
    <div className="relative w-full sm:w-80">
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        className={`
          w-full flex items-center justify-between gap-2 
          px-4 py-3 h-11
          rounded-lg 
          bg-gradient-to-b from-gray-800 to-gray-900
          border transition-all duration-200
          text-white shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-500/30
          ${
            isDropdownOpen
              ? "border-blue-500 from-gray-750 to-gray-850"
              : "border-gray-700 hover:border-gray-600"
          }
        `}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedPlanId ? (
            <span className="font-medium truncate">
              {selectedPlan?.planName || "Selected Plan"}
            </span>
          ) : (
            <span className="text-gray-400">Select a plan</span>
          )}
        </span>
        <LuChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
        >
          <div className="max-h-60 overflow-y-auto py-1 planScrollbar trainerDataSquareScrollbar">
            {workoutPlans.length > 0 ? (
              workoutPlans.map((plan) => (
                <button
                  key={plan._id}
                  onClick={() => {
                    if (setSelectedPlan) {
                      setSelectedPlan(plan);
                    }
                    if (setSelectedPlanId) {
                      setSelectedPlanId(plan._id);
                    }
                    setIsDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={plan._id === selectedPlanId}
                  className={`
                    w-full text-left px-4 py-3 
                    transition-colors duration-150
                    hover:bg-blue-500/20 active:bg-blue-500/30
                    ${plan._id === selectedPlanId ? "bg-blue-500/20" : ""}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        plan._id === selectedPlanId
                          ? "text-blue-300"
                          : "text-gray-200"
                      }`}
                    >
                      {plan.planName}
                    </span>
                    {plan._id === selectedPlanId && (
                      <LuCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <LuCalendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>
                      {plan.days.reduce(
                        (acc, currentVal) =>
                          !currentVal.isRestDay ? acc + 1 : acc,
                        0
                      )}{" "}
                      training days •{" "}
                      {plan.days[0]?.exercises[0]?.weekData?.length || 0} weeks
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center">
                No plans available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Display plan info when dropdown is closed */}
      {selectedPlanId && (
        <div className="mt-2 text-sm text-gray-400 flex items-center gap-2 px-1">
          <LuCalendar className="w-3.5 h-3.5 text-gray-500" />
          <span>
            {trainingDays} training days • {weekCount} weeks
          </span>
        </div>
      )}
    </div>
  );
}
