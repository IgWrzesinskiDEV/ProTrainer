"use client";
import PlanSelecter from "./PlanSelecter";
import { useState } from "react";
import WorkoutPlanComponent from "./WorkoutPlan";
import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import { LuCalendar } from "react-icons/lu";
export default function SelectAndPlans({
  workoutPlans,
}: {
  workoutPlans: string;
}) {
  const plans: WorkoutPlan[] = JSON.parse(workoutPlans);
  const [selectedPlanId, setSelectedPlan] = useState<string | null>(
    plans[0]?._id
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <LuCalendar className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Workout Plans</h1>
              <p className="text-gray-400">
                Select and view your training plans
              </p>
            </div>
          </div>

          <PlanSelecter
            workoutPlans={plans}
            setSelectedPlanId={setSelectedPlan}
            selectedPlanId={selectedPlanId}
          />
        </div>
        {selectedPlanId && (
          <WorkoutPlanComponent
            selectedPlan={plans.find((p) => p._id === selectedPlanId)}
          />
        )}
      </div>
    </>
  );
}
