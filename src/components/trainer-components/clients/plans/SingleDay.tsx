import {
  Exercise,
  WorkoutDay,
  WorkoutPlan,
} from "@/interfaces/workout/IWorkout";
import { Fragment, useState } from "react";
import RestDayCheckBox from "@/components/UI/workoutPlans/CheckBox";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuTrash, LuChevronDown, LuChevronUp } from "react-icons/lu";
export default function SingleDay({
  day,
  updateWeekData,
  updateExercise,
  addExercise,
  deleteExercise,
  selectedPlan,
}: {
  day: WorkoutDay;
  updateWeekData: (
    dayId: number,
    exerciseIndex: number,
    weekIndex: number,
    value: string
  ) => void;
  updateExercise: (
    dayId: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: string
  ) => void;
  addExercise: (dayId: number) => void;
  deleteExercise: (index: number, day: WorkoutDay) => void;
  selectedPlan: WorkoutPlan;
}) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [restDay, setRestDay] = useState<boolean>(false);

  function expandDayHandler(event: React.MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      (event.target.tagName === "INPUT" ||
        event.target.tagName === "BUTTON" ||
        event.target.tagName === "SVG")
    )
      return;
    if (restDay) return;

    setExpandedDay(expandedDay === day.id ? null : day.id);
  }

  function checkRestDayHandler(checked: boolean) {
    if (checked) {
      setExpandedDay(null);
    }
    setRestDay(checked);
  }
  return (
    <div className="bg-gray-600 rounded-lg overflow-hidden mb-4">
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${
          restDay && "cursor-default   pointer-events-none"
        }`}
        onClick={expandDayHandler}
      >
        <div className="flex items-center gap-4">
          <p className={`text-lg font-semibold ${restDay && "opacity-30"}`}>
            {day.day}
          </p>
          {/* <input
              value={day.day}
              onChange={(e) => {
                const updatedPlan = {
                  ...selectedPlan,
                  days: selectedPlan.days.map((d) =>
                    d.id === day.id ? { ...d, day: e.target.value } : d
                  ),
                };
                setSelectedPlan(updatedPlan);
                clientData.workoutPlans = clientData.workoutPlans.map((p) =>
                  p.planId === selectedPlan.planId ? updatedPlan : p
                );
              }}
              className="bg-gray-700 text-white px-2 py-1 rounded w-32"
              onClick={(e) => e.stopPropagation()}
            /> */}
          <RestDayCheckBox
            checkRestDayHandler={checkRestDayHandler}
            isRestDay={restDay}
          />
        </div>
        <div className={restDay ? "opacity-30 pointer-events-none" : undefined}>
          {expandedDay === day.id ? (
            <LuChevronUp className="w-5 h-5" />
          ) : (
            <LuChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {expandedDay === day.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        #
                      </th>
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Exercise
                      </th>
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Tempo
                      </th>
                      {Array.from(
                        { length: selectedPlan.weekCount },
                        (_, i) => (
                          <th
                            key={i}
                            colSpan={2}
                            className="border border-gray-600 px-4 py-2 text-left"
                          >
                            Week {i + 1}
                          </th>
                        )
                      )}
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((exercise, index) => (
                      <tr key={index} className="bg-gray-800">
                        <td className="border border-gray-600 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) =>
                              updateExercise(
                                day.id,
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            value={exercise.tempo}
                            onChange={(e) =>
                              updateExercise(
                                day.id,
                                index,
                                "tempo",
                                e.target.value
                              )
                            }
                            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                          />
                        </td>
                        {exercise.weekData.map((week, weekIndex) => (
                          <Fragment key={weekIndex}>
                            <td
                              key={weekIndex}
                              className="border border-gray-600 px-4 py-2"
                            >
                              <input
                                type="text"
                                value={week.coachData}
                                onChange={(e) =>
                                  updateWeekData(
                                    day.id,
                                    index,
                                    weekIndex,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                                placeholder="e.g., 3x10 20kg"
                              />
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                              <input
                                type="text"
                                className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                                placeholder="30kg"
                              />
                            </td>
                          </Fragment>
                        ))}
                        <td className="border border-gray-600 px-4 py-2">
                          <button
                            onClick={() => deleteExercise(index, day)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <LuTrash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => addExercise(day.id)}
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                <LuPlus className="w-5 h-5" />
                Add Exercise
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
