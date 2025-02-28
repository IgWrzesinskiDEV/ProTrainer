import { LuDumbbell, LuCalendar, LuClock } from "react-icons/lu";
import { WorkoutPlan as IWorkoutPlan } from "@/interfaces/workout/IWorkout";
import Link from "next/link";

export default function WorkoutPlan({
  selectedPlan,
}: {
  selectedPlan: IWorkoutPlan | undefined;
}) {
  if (!selectedPlan) {
    return null;
  }

  // Get the weekCount from the first exercise's weekData length
  const weekCount = selectedPlan.days[0]?.exercises[0]?.weekData?.length || 0;

  return (
    <div className="w-full p-4 space-y-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3 ml-5">
          {/* <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <LuCalendar className="w-5 h-5 text-blue-500" />
          </div> */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">
              {selectedPlan.planName || "Workout Plan"}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <LuClock className="w-4 h-4 text-blue-500" />

              <span className="font-medium text-blue-400">
                {weekCount} weeks
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        <div className="p-4 border-b border-gray-800/50 bg-[#1a1a1a]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <LuDumbbell className="w-4 h-4 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-gray-300">Weekly Schedule</h3>
                <p className="text-sm text-gray-500">
                  {selectedPlan.days.reduce(
                    (acc, currentVal) =>
                      !currentVal.isRestDay ? acc + 1 : acc,
                    0
                  )}{" "}
                  training days per week
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Training Day
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Rest Day
              </span>
            </div>
          </div>
        </div>

        <table className="w-full text-sm border-collapse h-full table-fixed">
          <thead>
            <tr className="border-b border-gray-800/50">
              {selectedPlan.days.map((day) => (
                <th
                  key={day.weekDay}
                  className="bg-[#1a1a1a]/50 backdrop-blur-sm text-gray-300 font-medium p-4 text-left first:rounded-tl-xl last:rounded-tr-xl"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        day?.isRestDay ? "bg-amber-500" : "bg-blue-500"
                      }`}
                    ></span>
                    {day.weekDay}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedPlan.days.map((day) => {
                if (day.isRestDay) {
                  return (
                    <td
                      key={day.weekDay}
                      className="relative bg-gradient-to-br w-44 from-blue-500/5 to-purple-500/5 p-6 border-r border-gray-800/90 last:border-r-0"
                    >
                      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-gray-400 group">
                        <div className="w-12 h-12 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
                          <span className="text-2xl cursor-default">🌙</span>
                        </div>
                        <span className="text-lg font-medium mb-2 text-gray-300">
                          Rest Day
                        </span>
                        <span className="text-sm text-gray-500 text-center">
                          Recovery & Regeneration
                        </span>
                      </div>
                    </td>
                  );
                }

                return (
                  <td
                    key={day.weekDay}
                    className="border-r h-full border-gray-800/90 last:border-r-0 group relative overflow-hidden"
                  >
                    <Link
                      href={`plans/${selectedPlan._id}/${day.weekDay}`}
                      className="inline-block h-full w-full px-6 py-3 my-auto hover:bg-blue-500/10 transition-all duration-300"
                    >
                      <div className="flex flex-col h-full z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                            <LuDumbbell className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-blue-400 font-medium text-base">
                            {day.exercises.length} Exercises
                          </span>
                        </div>
                        <ol className="space-y-3 text-gray-300">
                          {day.exercises.map((exercise) => (
                            <li
                              key={exercise.number}
                              className="flex items-start gap-3 group/item  transition-colors duration-200"
                            >
                              <span className="flex items-center text-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                                {exercise.number}
                              </span>
                              <span className="text-base font-medium w-3/4">
                                {exercise.name.at(0)!.toUpperCase() +
                                  exercise.name.slice(1)}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </Link>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
