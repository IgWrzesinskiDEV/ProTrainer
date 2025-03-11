"use client";
import PlanSelecter from "./PlanSelecter";
import { useState } from "react";
import WorkoutPlanComponent from "./WorkoutPlan";
import type { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import { LuCalendar, LuInfo, LuUserPlus } from "react-icons/lu";
import Link from "next/link";

export default function SelectAndPlans({
  workoutPlans,
}: {
  workoutPlans: string;
}) {
  const plans: WorkoutPlan[] = JSON.parse(workoutPlans);
  const [selectedPlanId, setSelectedPlan] = useState<string | null>(
    plans[0]?._id
  );
  const hasPlansData = plans.length > 0;

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

        {hasPlansData ? (
          selectedPlanId && (
            <WorkoutPlanComponent
              selectedPlan={plans.find((p) => p._id === selectedPlanId)}
            />
          )
        ) : (
          <div className="mt-6 bg-gradient-to-br  p-8 ">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <LuUserPlus className="w-10 h-10 text-blue-400" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3">
                No Workout Plans Available
              </h2>

              <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-3 rounded-lg border border-blue-500/30">
                <LuInfo className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className=" text-xs sm:text-sm text-blue-200">
                  Contact your trainer or add a new trainer to get started with
                  your fitness journey.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/dashboard/trainers"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
                >
                  Find a Trainer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
