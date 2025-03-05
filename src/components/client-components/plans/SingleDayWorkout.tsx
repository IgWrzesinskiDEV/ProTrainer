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
      <div className="flex flex-col gap-3 w-full items-center justify-center p-4 sm:p-6">
        <p className="text-center text-gray-300">No plan selected</p>
        <Link
          href="/dashboard/plans/"
          className="p-2 hover:bg-blue-600 bg-blue-500 rounded-lg text-center text-white text-sm sm:text-base"
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
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-amber-500/10 flex items-center justify-center">
            <LuMoon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 text-center">
            Rest Day
          </h2>
          <p className="text-sm sm:text-base text-gray-400 text-center max-w-md px-2">
            Take time to recover and recharge. Rest is an essential part of your
            fitness journey.
          </p>
          <BackToLink
            href="/dashboard/plans"
            className="text-xs sm:text-sm text-gray-300 hover:text-white bg-blue-500/20 mt-3 rounded-lg hover:bg-gray-800 flex items-center gap-1 px-3 py-2"
          >
            <LuArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to plans
          </BackToLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-lg border w-full border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-gray-800">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 tracking-tight">
            {singleDay.weekDay}
          </p>
          <BackToLink
            href="/dashboard/plans"
            className="text-xs sm:text-sm text-gray-300 hover:text-white bg-blue-500/20 rounded-lg hover:bg-gray-800 flex items-center gap-1 px-3 py-2 sm:px-3 sm:py-2"
          >
            <LuArrowLeft className=" w-4 h-4 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to plans</span>
          </BackToLink>
        </div>

        {/* Mobile view - Card layout for small screens */}
        <div className="md:hidden">
          {singleDay.exercises.map((exercise, idx) => (
            <div
              key={exercise.number}
              className={`p-4 border-b border-gray-800 ${
                idx % 2 === 0 ? "bg-[#182030]" : "bg-[#131B2B]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-semibold">
                    {exercise.number}
                  </span>
                  <h3 className="font-medium text-gray-100">
                    {exercise.name || ""}
                  </h3>
                </div>
                {exercise.exerciseDetailsId && (
                  <ExerciseDetailsLink
                    exerciseId={exercise.exerciseDetailsId}
                    className="p-1.5 hover:bg-gray-700 static translate-y-0  text-gray-400 hover:text-gray-200 transition-colors"
                  />
                )}
              </div>

              {exercise.tempo && (
                <div className="mb-3">
                  <span className="text-sm text-gray-400">Tempo:</span>
                  <span className="ml-2 text-gray-100">{exercise.tempo}</span>
                </div>
              )}

              <div className="space-y-4">
                {exercise.weekData.map((week, index) => (
                  <div
                    key={`${exercise.number}-${week.weekNumber}-${index}`}
                    className="p-3 bg-gray-800/50 rounded-lg"
                  >
                    <div className="text-sm font-medium text-blue-400 mb-2">
                      Week {week.weekNumber}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="w-full">
                        <InputFloatingLabel
                          forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-trainerData-mobile`}
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
                          classNameAdded="bg-gray-800/90"
                        />
                      </div>
                      <div className="w-full">
                        <InputFloatingLabel
                          forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-clientData-mobile`}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view - Table layout for medium and larger screens */}
        <div className="hidden md:block overflow-x-auto planScrollbar scrollBarRectangle w-full rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
                <th className="sticky left-0 top-0 z-20 bg-[#111926] border-b-2 border-r border-blue-500/20 px-4 lg:px-6 py-3 lg:py-4 text-blue-500 font-semibold w-12">
                  #
                </th>
                <th className=" left-14 z-20 bg-[#111926] border-b-2 border-r border-blue-500/20 px-4 lg:px-6 py-3 lg:py-4 text-left text-blue-500 font-semibold">
                  <p className="w-60">Exercise</p>
                </th>
                <th className=" left-[320px]  text-left z-20 border-b-2 border-r bg-[#111926] border-blue-500/20 px-4 lg:px-6 py-3 lg:py-4 text-blue-500 font-semibold">
                  <p className="w-16 lg:w-20">Tempo</p>
                </th>

                {Array.from({ length: weekCount }, (_, i) => (
                  <th
                    key={i}
                    colSpan={2}
                    className="border-b-2 border-r border-blue-500/20 px-4 lg:px-6 py-3 lg:py-4 text-left w-40 lg:w-48 text-nowrap text-blue-500 font-semibold bg-gray-900"
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
                  <td className="sticky left-0 z-[100] bg-inherit border-b border-r border-gray-800 px-4 lg:px-6 py-3 lg:py-4 group/cell">
                    <span className="flex items-center  mx-auto select-none justify-center w-8 h-8 rounded-lg bg-inherit text-blue-400 font-semibold transition-all group-hover:bg-blue-500/20 group-hover:text-blue-300">
                      {exercise.number}
                    </span>
                    <div className="absolute top-1/2 left-full z-[120] -translate-y-1/2 ml-2 opacity-0 invisible group-hover/cell:opacity-100 group-hover/cell:visible transition-all duration-200 transform scale-95 group-hover/cell:scale-100 pointer-events-none">
                      <div className="bg-gray-900 text-white text-sm rounded-md py-1.5 px-3 shadow-lg max-w-xs">
                        <p className="whitespace-normal">
                          {exercise.name || "No exercise selected"}
                        </p>
                        <div className="absolute h-2 w-2 bg-gray-900 transform rotate-45 top-1/2 -translate-y-1/2 -left-1"></div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={` relative z-30 bg-inherit border-b border-r border-gray-800 px-4 lg:px-6 py-3 lg:py-4`}
                  >
                    <p className="w-full min-w-24 flex items-center justify-between text-gray-100">
                      {exercise.name || ""}
                      {exercise.exerciseDetailsId && (
                        <ExerciseDetailsLink
                          exerciseId={exercise.exerciseDetailsId}
                          className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
                        />
                      )}
                    </p>
                  </td>
                  <td
                    className={` left-[320px] lg:left-[368px] z-30 bg-inherit border-b border-r border-gray-800 px-4 lg:px-6 py-3 lg:py-4 text-gray-300`}
                  >
                    <p className="w-full min-w-16 lg:min-w-20 text-gray-100">
                      {exercise.tempo || ""}
                    </p>
                  </td>

                  {exercise.weekData.map((week, index) => (
                    <Fragment
                      key={`${exercise.number}-${week.weekNumber}-${index}`}
                    >
                      <td className="border-b border-r border-gray-800 px-4 lg:px-6 py-3 lg:py-4">
                        <div className="relative group/input w-28 lg:w-32">
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
                            classNameAdded="bg-gray-800/90"
                          />
                        </div>
                      </td>
                      <td className="border-b border-r border-gray-800 px-4 lg:px-6 py-3 lg:py-4">
                        <div className="relative group/input w-28 lg:w-32">
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
        </div>

        {(saveSingleDayState?.errors?.length ?? 0) > 0 && (
          <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg m-3 sm:m-4">
            {saveSingleDayState?.errors &&
              saveSingleDayState.errors.map((error) => (
                <p key={error} className="text-red-400 text-xs sm:text-sm">
                  {error}
                </p>
              ))}
          </div>
        )}

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
            className="flex w-fit h-10 sm:h-12 mb-4 sm:mb-5 border-2 border-blue-500 disabled:bg-transparent disabled:border-blue-500 items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 mx-auto bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 mt-3 sm:mt-4"
          >
            <LuSave className="w-3 h-3 sm:w-4 sm:h-4" />
            Save Changes
          </ButtonWithLoading>
        ) : (
          <p className="text-blue-500 text-center p-4">
            No exercises added yet
          </p>
        )}
      </div>
    </>
  );
}
