"use client";
import PlanSelecter from "./PlanSelecter";
import { useState } from "react";
import WorkoutPlanComponent from "./WorkoutPlan";
import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
export default function SelectAndPlans({
  workoutPlans,
}: {
  workoutPlans: string;
}) {
  const plans: WorkoutPlan[] = JSON.parse(workoutPlans);
  const [selectedPlanId, setSelectedPlan] = useState<string | null>(null);
  return (
    <>
      <PlanSelecter
        workoutPlans={plans}
        setSelectedPlanId={setSelectedPlan}
        selectedPlanId={selectedPlanId}
      />
      <WorkoutPlanComponent
        selectedPlan={plans.find((p) => p._id === selectedPlanId)}
      />
    </>
  );
}
