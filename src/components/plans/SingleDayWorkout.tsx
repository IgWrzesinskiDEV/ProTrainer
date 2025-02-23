"use client";

import { Fragment, useActionState, useState, useTransition } from "react";

import type { WeekData, WorkoutDay } from "@/interfaces/workout/IWorkout";
import InputFloatingLabel from "../UI/input/InputWithFloatingLabel";
import ButtonWithLoading from "../UI/Buttons/ButtonWithLoading";
import { saveSingleDayExercisesClientData } from "@/actions/clientWorkoutPlans.action";
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
  const singleDayData = JSON.parse(day);

  const { isRestDay } = singleDayData;
  const { singleDay: singleDayplan, weekCount } = singleDayData as {
    singleDay: WorkoutDay;
    weekCount: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [singleDay, setSingleDay] = useState<WorkoutDay>(singleDayplan);
  const [saveSingleDayState, saveSingleDayAction, pending] = useActionState(
    () => saveSingleDayExercisesClientData(singleDay, planId),
    initialState
  );
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

  return (
    <div className="bg-gray-900 rounded-xl p-6 w-4/5 overflow-hidden mb-4 shadow-xl border border-blue-500/20">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-2xl font-bold text-blue-500 tracking-tight">
          {singleDay.weekDay}
        </p>
      </div>

      <div className="overflow-x-auto planScrollbar scrollBarRectangle w-full rounded-lg">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 bg-gray-900 border-b-2 border-r border-blue-500/20 px-6 py-4 text-blue-500 font-semibold w-12">
                #
              </th>
              <th className="sticky left-20 z-20 bg-gray-900 border-b-2 border-r border-blue-500/20 px-6 py-4 text-left text-blue-500 font-semibold">
                <p className="w-60">Exercise</p>
              </th>
              <th className="sticky left-[368px] text-left z-20 border-b-2 border-r bg-gray-900 border-blue-500/20 px-6 py-4 text-blue-500 font-semibold">
                <p className="w-20">Tempo</p>
              </th>

              {Array.from({ length: weekCount }, (_, i) => (
                <th
                  key={i}
                  colSpan={2}
                  className="border-b-2 border-r border-blue-500/20 px-6 py-4 text-left w-48 text-nowrap text-blue-500 font-semibold bg-gray-900"
                >
                  <span className="flex items-center gap-2">Week {i + 1}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {singleDay.exercises.map((exercise, idx) => (
              <tr
                key={exercise.number}
                className={`transition-all duration-150 group ${
                  idx % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800/30"
                }`}
              >
                <td
                  className={`sticky left-0 z-10 border-b border-r bg-gray-900 border-blue-500/20 px-6 py-4 w-12 transition-colors group-hover:bg-[#1C2B43] `}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-semibold transition-all group-hover:bg-blue-500/20 group-hover:text-blue-300">
                    {exercise.number}
                  </span>
                </td>
                <td
                  className={`sticky left-20 z-10 border-b border-r bg-gray-900 border-blue-500/20 px-6 py-4 w-60 font-medium transition-colors group-hover:bg-[#1C2B43] `}
                >
                  <p className=" w-full min-w-24 text-gray-100">
                    {exercise.name || ""}
                  </p>
                </td>
                <td
                  className={`sticky left-[368px] z-10 border-b border-r bg-gray-900 border-blue-500/20 px-6 py-4 w-20 transition-colors group-hover:bg-[#1C2B43] `}
                >
                  <p className=" w-full min-w-20 text-gray-100">
                    {exercise.tempo || ""}
                  </p>
                </td>

                {exercise.weekData.map((week, index) => (
                  <Fragment
                    key={`${exercise.number}-${week.weekNumber}-${index}`}
                  >
                    <td className="border-b border-blue-500/20 px-6 py-4 w-24 transition-colors group-hover:bg-blue-500/5">
                      <div className="relative group/input w-32">
                        <InputFloatingLabel
                          forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
                          label="Trainer data"
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
                          className="bg-gray-800/50 border-blue-500/20 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all hover:border-blue-400/30 text-gray-100 placeholder-gray-500"
                        />
                      </div>
                    </td>
                    <td className="border-b border-r border-blue-500/20 px-6 py-4 w-24 transition-colors group-hover:bg-blue-500/5">
                      <div className="relative group/input w-32">
                        <InputFloatingLabel
                          forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
                          label="Client data"
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
                          className="bg-gray-800/50 border-blue-500/20 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all hover:border-blue-400/30 text-gray-100 placeholder-gray-500"
                        />
                      </div>
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 text-red-500">
          {saveSingleDayState?.errors &&
            saveSingleDayState.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
        </div>
        <ButtonWithLoading
          isLoading={pending}
          isDisabled={pending}
          type="submit"
          onClick={() => startTransition(() => saveSingleDayAction())}
          className="flex w-fit min-w-40 disabled:bg-transparent disabled:border disabled:border-blue-500 items-center gap-2 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
        >
          Save Changes
        </ButtonWithLoading>
      </div>
    </div>
  );
}

// <div className="p-4 w-full">
//       <form
//         action={formAction}
//         ref={formRef}
//         className="rounded-lg shadow-lg bg-[#1E2330] overflow-hidden"
//       >
//         <div className="p-6 border-b border-[#2A3142]">
//           <h3 className="text-2xl font-bold text-white">
//             {singleDayplan.weekDay}
//           </h3>
//         </div>

//         <div className="p-6 overflow-x-auto">
//           {singleDayplan.exercises.length > 0 ? (
//             <table className="w-full border-collapse min-w-[800px] table-fixed">
//               <thead>
//                 <tr className="border-b border-[#2A3142]">
//                   <th className="py-4 px-4 w-14 text-left text-sm font-medium text-gray-400">
//                     #
//                   </th>
//                   <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
//                     Exercise
//                   </th>
//                   <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
//                     Tempo
//                   </th>
//                   {Array.from({ length: weekCount }, (_, i) => (
//                     <th
//                       key={i}
//                       colSpan={2}
//                       className="py-4 px-4 text-center text-sm font-medium text-gray-400"
//                     >
//                       Week {i + 1}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#2A3142]">
//                 {singleDayplan.exercises.map((exercise, index) => {
//                   const id = generateIdFromEntropySize(10);
//                   return (
//                     <PlansTablePopper
//                       key={id}
//                       exercise={exercise}
//                       index={index}
//                       id={exercise.name}
//                       onPopperClickHandler={submitFormHandler}
//                     />
//                   );
//                 })}
//               </tbody>
//             </table>
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-400">No exercises scheduled for today</p>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>

{
  /* <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-4/5 overflow-hidden mb-4 shadow-lg border border-blue-500/20">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-xl font-bold text-blue-500">{singleDayplan.weekDay}</p>
      </div>
      
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 rounded-lg">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-10 bg-blue-500/10 backdrop-blur-sm border-t border-r border-blue-500/20 px-6 py-4 text-left w-12 text-blue-500 font-semibold">
                #
              </th>
              <th className="sticky left-10 z-10 bg-blue-500/10 backdrop-blur-sm border-t border-r border-blue-500/20 px-6 py-4 text-left text-blue-500 font-semibold">
                <p className="w-60">Exercise</p>
              </th>
              <th className="sticky left-[312px] text-left z-10 border-t border-r bg-blue-500/10 backdrop-blur-sm border-blue-500/20 px-6 py-4 text-blue-500 font-semibold">
                <p className="w-32">Tempo</p>
              </th>

              {Array.from({ length: weekCount }, (_, i) => (
                <th
                  key={i}
                  colSpan={2}
                  className="border-t border-r border-blue-500/20 px-6 py-4 text-left w-48 text-nowrap text-blue-500 font-semibold bg-blue-500/5"
                >
                  Week {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {singleDayplan.exercises.map((exercise, idx) => (
              <tr 
                key={exercise.number} 
                className={`transition-colors hover:bg-blue-500/5 ${
                  idx % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/30'
                }`}
              >
                <td className="sticky left-0 z-10 border-b border-r border-blue-500/20 px-6 py-4 w-12 backdrop-blur-sm">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-500">
                    {exercise.number}
                  </span>
                </td>
                <td className="sticky left-10 z-10 border-b border-r border-blue-500/20 px-6 py-4 w-60 font-medium backdrop-blur-sm">
                  {exercise.name || ""}
                </td>
                <td className="sticky left-[312px] z-10 border-b border-r border-blue-500/20 px-6 py-4 w-40 backdrop-blur-sm">
                  {exercise.tempo || ""}
                </td>

                {exercise.weekData.map((week, index) => (
                  <Fragment key={`${exercise.number}-${week.weekNumber}-${index}`}>
                    <td className="border-b border-blue-500/20 px-6 py-4 w-24">
                      <div className="relative group">
                      <InputFloatingLabel
                        forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
                        label="Trainer data"
                        type="text"
                        value={week.trainerData || ""}
                        // onChange={(e) =>
                        //   updateWeekData(
                        //     exercise.number,
                        //     week.weekNumber,
                        //     "trainerData",
                        //     e.target.value
                        //   )
                        // }
                      />
                      </div>
                    </td>
                    <td className="border-b border-r border-blue-500/20 px-6 py-4 w-24">
                      <div className="relative group">
                      <InputFloatingLabel
                        forHTMLLabel={`${singleDayplan.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
                        label="Client data"
                        type="text"
                        value={week.clientData || ""}
                        // onChange={(e) =>
                        //   updateWeekData(
                        //     exercise.number,
                        //     week.weekNumber,
                        //     "clientData",
                        //     e.target.value
                        //   )
                        // }
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
    </div> */
}
