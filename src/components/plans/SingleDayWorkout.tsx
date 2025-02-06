"use client";

import { ex as plan } from "@/components/plans/WorkoutPlan";

import PlansTablePopper from "./PlansTablePopper";
import { generateIdFromEntropySize } from "lucia";

export default function SingleDayWorkout() {
  const plandata = plan.days[0];
  const borderColor = "border-[#aaaabc]/50";
  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">{plan.planName} Workout Plan</h2>

      <div
        key={plandata.id}
        className="rounded-lg shadow-lg mb-6 p-10 bg-neutral-900 flex items-start flex-col overflow-x-auto planScrollbar"
      >
        <h3 className="text-xl font-semibold mb-2">{plandata.day}</h3>
        <p className="italic text-gray-600 mb-4">{plandata.workoutTitle}</p>
        {plandata.exercises.length > 0 ? (
          <table className="border-collapse table-fixed text-sm">
            <thead className="">
              <tr className="bg-backgound text-nowrap">
                <th className={`border ${borderColor} px-2 py-1`}>#</th>
                <th className={`border ${borderColor} px-2 py-1`}>Exercise</th>
                <th className={`border ${borderColor} px-2 py-1`}>Tempo</th>

                {plandata.exercises[0].weekData.map((week, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className={`border ${borderColor} px-2 py-1 text-center`}
                  >
                    Week {week.week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {plandata.exercises.map((exercise, index) => {
                const id = generateIdFromEntropySize(10);
                return (
                  <PlansTablePopper
                    borderColor={borderColor}
                    key={id}
                    exercise={exercise}
                    index={index}
                    id={exercise.name}
                    onPopperClickHandler={() => {}}
                  />
                );
              })}
              {/* <td
                    className={`border ${borderColor} px-2 py-1 text-center font-bold`}
                  >
                    {index + 1}
                  </td>
                  <td className={`border ${borderColor} px-2 py-1`}>
                    {exercise.name}
                  </td>
                  <td className={`border ${borderColor} px-2 py-1`}>
                    {exercise.tempo}
                  </td>
                  {exercise.weekData.map((week, weekIndex) => (
                    <>
                      <td
                        key={weekIndex}
                        className={`border ${borderColor} px-2 py-1 text-center`}
                      >
                        {week.coachData}
                      </td>
                      <td
                        className={`border ${borderColor} px-2 py-1 text-center `}
                      >
                        {activeExerciseEdit === exercise.number ? (
                          <input
                            type="text"
                            defaultValue={week?.userData || ""}
                            className=" bg-transparent block animate-pulse text-amber-500  font-bold w-12 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        ) : (
                          week.userData || ""
                        )}
                      </td>
                    </>
                  ))} */}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No exercises available.</p>
        )}
      </div>
    </div>
  );
}
