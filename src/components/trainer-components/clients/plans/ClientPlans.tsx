"use client";
import { useState } from "react";
import { LuMinus, LuPlus, LuChevronDown } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";

import { WorkoutPlan, WeekDays } from "@/interfaces/workout/IWorkout";
import { useActionState } from "react";
import { addEmptyWorkoutPlan } from "@/actions/trainerClients.actions";
import SingleDay from "./SingleDay";
import InputWithErrorHandler from "@/components/UI/input/InputWithErrorHandler";
import PlanSearchSelect from "@/components/UI/Select/PlanSearchSelect";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
const initialState = {
  errors: [],
};
export default function ClientPlans({
  clientId,
  clientPlans,
}: {
  clientId: string;
  clientPlans: string;
}) {
  const [formState, addEmptyPlanAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      addEmptyWorkoutPlan(prevState, formData, clientId),
    initialState
  );
  const hasError = (formState?.errors?.length ?? 0) > 0;
  const workoutPlans: WorkoutPlan[] = JSON.parse(clientPlans);

  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(
    workoutPlans[0] || null
  );

  function updateWeekData(
    weekDay: WeekDays,
    exerciseIndex: number,
    weekIndex: number,
    value: string
  ) {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      days: selectedPlan.days.map((day) => {
        if (day.weekDay === weekDay) {
          return {
            ...day,
            exercises: day.exercises.map((ex, i) => {
              if (i === exerciseIndex) {
                const updatedWeekData = [...ex.weekData];
                updatedWeekData[weekIndex] = {
                  ...updatedWeekData[weekIndex],
                  coachData: value,
                };
                return { ...ex, weekData: updatedWeekData };
              }
              return ex;
            }),
          };
        }
        return day;
      }),
    };
    setSelectedPlan(updatedPlan);
  }

  function addWeek() {
    if (!selectedPlan) return;
    const updatedPlan = {
      ...selectedPlan,
      weekCount: selectedPlan.weekCount + 1,
      days: selectedPlan.days.map((day) => ({
        ...day,
        exercises: day.exercises.map((ex) => ({
          ...ex,
          weekData: [
            ...ex.weekData,
            { week: selectedPlan.weekCount + 1, coachData: "" },
          ],
        })),
      })),
    };
    setSelectedPlan(updatedPlan);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Workout Plans</h2>
      <div className="flex items-center gap-4 mb-4">
        <PlanSearchSelect
          workoutPlans={workoutPlans}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
        <form action={addEmptyPlanAction} className="flex items-center gap-4">
          <InputWithErrorHandler
            hasError={hasError}
            errorMessage={formState.errors?.[0]}
          />

          <ButtonWithLoading
            isLoading={isPending}
            type="submit"
            className="flex items-center w-fit gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <LuPlus className="w-5 h-5" />
            Add New Plan
          </ButtonWithLoading>
        </form>

        {selectedPlan && (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={addWeek}
            >
              <LuPlus className="w-5 h-5" />
              Add Week
            </button>
            <button className="flex items-center ml-auto gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              <LuMinus className="w-5 h-5" />
              Remove workout plan
            </button>
          </>
        )}
      </div>

      {selectedPlan &&
        selectedPlan.days.map((day) => (
          <SingleDay
            day={day}
            key={day.weekDay}
            updateWeekData={updateWeekData}
            selectedPlan={selectedPlan}
          />
        ))}
    </div>
  );
}

// {
//   <div className="flex flex-col gap-2 relative">
//             <input
//               type="text"
//               name="planName"
//               placeholder="New plan name"
//               className={`bg-gray-600 text-white px-4 py-2 rounded ${
//                 formState?.errors?.length ? "border-red-500" : ""
//               }`}
//             />
//             {formState?.errors?.length ? (
//               <span className="text-red-500 absolute bottom-0 font-thin text-sm">
//                 {formState.errors[0]}
//               </span>
//             ) : null}
//           </div>
// }
