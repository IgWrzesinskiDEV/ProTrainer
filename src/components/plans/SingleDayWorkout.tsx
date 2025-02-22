"use client";

import { useRef, useActionState } from "react";
import saveExercisesUserData from "@/actions/workoutPlans.action";
import PlansTablePopper from "./PlansTablePopper";
import { generateIdFromEntropySize } from "lucia";
import type { WorkoutDay } from "@/interfaces/workout/IWorkout";

const initialState = {
  error: "",
};

export default function SingleDayWorkout({ singleDay }: { singleDay: string }) {
  const [formState, formAction] = useActionState(
    saveExercisesUserData,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const singleDayData = JSON.parse(singleDay);
  const { isRestDay } = singleDayData;

  if (isRestDay) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px] bg-[#1E2330] rounded-lg shadow-lg">
        <div className="w-16 h-16 mb-4 rounded-full bg-[#2A3142] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Rest Day</h2>
        <p className="text-gray-400 text-center max-w-md">
          Take time to recover and recharge. Rest is an essential part of your
          fitness journey.
        </p>
      </div>
    );
  }

  const { singleDay: singleDayplan, weekCount } = singleDayData as {
    singleDay: WorkoutDay;
    weekCount: number;
  };

  function submitFormHandler() {
    formRef.current?.requestSubmit();
  }

  return (
    <div className="p-4 w-full">
      <form
        action={formAction}
        ref={formRef}
        className="rounded-lg shadow-lg bg-[#1E2330] overflow-hidden"
      >
        <div className="p-6 border-b border-[#2A3142]">
          <h3 className="text-2xl font-bold text-white">
            {singleDayplan.weekDay}
          </h3>
        </div>

        <div className="p-6 overflow-x-auto">
          {singleDayplan.exercises.length > 0 ? (
            <table className="w-full border-collapse min-w-[800px] table-fixed">
              <thead>
                <tr className="border-b border-[#2A3142]">
                  <th className="py-4 px-4 w-14 text-left text-sm font-medium text-gray-400">
                    #
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                    Exercise
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                    Tempo
                  </th>
                  {Array.from({ length: weekCount }, (_, i) => (
                    <th
                      key={i}
                      colSpan={2}
                      className="py-4 px-4 text-center text-sm font-medium text-gray-400"
                    >
                      Week {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A3142]">
                {singleDayplan.exercises.map((exercise, index) => {
                  const id = generateIdFromEntropySize(10);
                  return (
                    <PlansTablePopper
                      key={id}
                      exercise={exercise}
                      index={index}
                      id={exercise.name}
                      onPopperClickHandler={submitFormHandler}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No exercises scheduled for today</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
