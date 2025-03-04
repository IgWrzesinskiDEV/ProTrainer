"use client";

import { Fragment, useActionState, useState, useTransition } from "react";

import type { WeekData, WorkoutDay } from "@/interfaces/workout/IWorkout";
import InputFloatingLabel from "@/components/UI/input/InputWithFloatingLabel";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import { saveSingleDayExercisesClientData } from "@/actions/clientWorkoutPlans.action";

import { toastify } from "@/components/UI/Toastify";
import SaveChangesToast from "@/components/UI/toastify/SaveChangesToast";
import Link from "next/link";
import BackToLink from "@/components/UI/Buttons/BackToLink";

import ExerciseDetailsLink from "@/components/UI/links/ExerciseDetailsLink";
import { LuArrowLeft, LuMoon, LuSave } from "react-icons/lu";
const initialState = {
  errors: [],
};
export default function SingleDayWorkout({
  day,
  planId,
}: {
  day: string;
  planId: string;
}) {
  const singleDayData = JSON.parse(day) as {
    singleDay: WorkoutDay;
    weekCount: number;
    isRestDay: boolean;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [singleDay, setSingleDay] = useState<WorkoutDay>(
    singleDayData?.singleDay || null
  );
  const [saveSingleDayState, saveSingleDayAction, pending] = useActionState(
    () => saveSingleDayExercisesClientData(singleDay, planId),
    initialState
  );
  if (!singleDay && !singleDayData.isRestDay)
    return (
      <div className="flex flex-col gap-3 w-full items-center justify-center p-6">
        No plan selected
        <Link
          href="/dashboard/plans/"
          className="p-2 hover:bg-blue-600 bg-blue-500 rounded-lg text-center"
        >
          Back to plans
        </Link>
      </div>
    );
  const { singleDay: singleDayplan, weekCount } = singleDayData as {
    singleDay: WorkoutDay;
    weekCount: number;
  };
  function updateWeekData(
    exerciseNumber: number,
    weekNumber: number,
    field: keyof WeekData,
    value: string
  ) {
    const updatedDay = {
      ...singleDay,
      exercises: singleDay.exercises.map((exercise) => {
        if (exercise.number === exerciseNumber) {
          return {
            ...exercise,
            weekData: exercise.weekData.map((week) => {
              if (week.weekNumber === weekNumber) {
                return { ...week, [field]: value };
              }
              return week;
            }),
          };
        }
        return exercise;
      }),
    };
    setSingleDay(updatedDay);
  }
  const { isRestDay } = singleDayData;
  if (isRestDay) {
    return (
      <div className="relative w-full">
        <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
          <div className="w-16 h-16 mb-6 rounded-full bg-amber-500/10 flex items-center justify-center">
            <LuMoon className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Rest Day</h2>
          <p className="text-gray-400 text-center max-w-md">
            Take time to recover and recharge. Rest is an essential part of your
            fitness journey.
          </p>
          <BackToLink
            href="/dashboard/plans"
            className="  text-sm text-gray-300  hover:text-white bg-blue-500/20 mt-3  rounded-lg hover:bg-gray-800 "
          >
            <LuArrowLeft className="w-4 h-4" />
            Back to plans
          </BackToLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-lg border w-full border-gray-800 bg-gray-900">
        <div className="flex items-center gap-4 ">
          <p className="text-2xl font-bold p-5 text-blue-500 tracking-tight">
            {singleDay.weekDay}
          </p>
        </div>

        <div className="overflow-x-auto planScrollbar scrollBarRectangle w-full rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
                <th className="sticky left-0 top-0 z-20 bg-[#111926] border-b-2 border-r border-blue-500/20 px-6 py-4 text-blue-500 font-semibold w-12">
                  #
                </th>
                <th className="sticky left-20 z-20 bg-[#111926] border-b-2 border-r border-blue-500/20 px-6 py-4 text-left text-blue-500 font-semibold">
                  <p className="w-60">Exercise</p>
                </th>
                <th className="sticky left-[368px] text-left z-20 border-b-2 border-r bg-[#111926] border-blue-500/20 px-6 py-4 text-blue-500 font-semibold">
                  <p className="w-20">Tempo</p>
                </th>

                {Array.from({ length: weekCount }, (_, i) => (
                  <th
                    key={i}
                    colSpan={2}
                    className="border-b-2 border-r border-blue-500/20 px-6 py-4 text-left w-48 text-nowrap text-blue-500 font-semibold bg-gray-900"
                  >
                    <span className="flex items-center gap-2">
                      Week {i + 1}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {singleDay.exercises.map((exercise, idx) => (
                <tr
                  key={exercise.number}
                  className={`transition-all duration-150 group ${
                    idx % 2 === 0 ? "bg-[#182030]" : "bg-[#131B2B]"
                  }`}
                >
                  <td className="sticky left-0 z-30 bg-inherit border-b border-r border-gray-800 px-6 py-4">
                    <span className="flex items-center mx-auto  justify-center w-9 h-8 rounded-lg bg-inherit  text-blue-400 font-semibold transition-all group-hover:bg-blue-500/20 group-hover:text-blue-300">
                      {exercise.number}
                    </span>
                  </td>
                  <td
                    className={`sticky left-20 z-30 bg-inherit border-b border-r border-gray-800 px-6 py-4 `}
                  >
                    <p className=" w-full min-w-24 flex items-center justify-between text-gray-100">
                      {exercise.name || ""}
                      {exercise.exerciseDetailsId && (
                        <ExerciseDetailsLink
                          exerciseId={exercise.exerciseDetailsId}
                          className="p-1.5  hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
                        />
                      )}
                    </p>
                  </td>
                  <td
                    className={`sticky left-[368px] z-30 bg-inherit border-b border-r border-gray-800 px-6 py-4 text-gray-300 `}
                  >
                    <p className=" w-full min-w-20 text-gray-100">
                      {exercise.tempo || ""}
                    </p>
                  </td>

                  {exercise.weekData.map((week, index) => (
                    <Fragment
                      key={`${exercise.number}-${week.weekNumber}-${index}`}
                    >
                      <td className="border-b border-r border-gray-800 px-6 py-4">
                        <div className="relative group/input w-32">
                          <InputFloatingLabel
                            forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
                            label="Trainer"
                            type="text"
                            value={week.trainerData || ""}
                            onChange={(e) =>
                              updateWeekData(
                                exercise.number,
                                week.weekNumber,
                                "trainerData",
                                e.target.value
                              )
                            }
                            classNameAdded="bg-gray-800/90 "
                          />
                        </div>
                      </td>
                      <td className="border-b border-r border-gray-800 px-6 py-4">
                        <div className="relative group/input w-32">
                          <InputFloatingLabel
                            forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
                            label="Client"
                            type="text"
                            value={week.clientData || ""}
                            onChange={(e) =>
                              updateWeekData(
                                exercise.number,
                                week.weekNumber,
                                "clientData",
                                e.target.value
                              )
                            }
                            classNameAdded="bg-gray-800/90"
                          />
                        </div>
                      </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {(saveSingleDayState?.errors?.length ?? 0) > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              {saveSingleDayState?.errors &&
                saveSingleDayState.errors.map((error) => (
                  <p key={error} className="text-red-400 text-sm">
                    {error}
                  </p>
                ))}
            </div>
          )}
        </div>
        {singleDay.exercises.length > 0 ? (
          <ButtonWithLoading
            isLoading={pending}
            isDisabled={pending}
            type="submit"
            onClick={() =>
              startTransition(() => {
                saveSingleDayAction();
                toastify(<SaveChangesToast />, 3000);
              })
            }
            className="flex w-fit h-12 mb-5 border-2 border-blue-500 disabled:bg-transparent  disabled:border-blue-500 items-center gap-2 px-4 py-2 mx-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
          >
            <LuSave className="w-4 h-4" />
            Save Changes
          </ButtonWithLoading>
        ) : (
          <p className="text-blue-500">No exercises added yet</p>
        )}
      </div>
    </>
  );
}
