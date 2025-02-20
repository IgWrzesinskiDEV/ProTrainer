"use client";
import {
  Exercise,
  WorkoutDay,
  WeekDays,
  WorkoutPlan,
} from "@/interfaces/workout/IWorkout";
import {
  Fragment,
  useState,
  useActionState,
  useTransition,
  useEffect,
} from "react";
import RestDayCheckBox from "@/components/UI/workoutPlans/RestDayCheckBox";
import { motion, AnimatePresence } from "framer-motion";
import { saveSingleDayExercises } from "@/actions/trainerClients.actions";
import { LuPlus, LuTrash, LuChevronDown, LuChevronUp } from "react-icons/lu";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";

const initialState = {
  errors: [],
};
export default function SingleDay({
  day,
  updateWeekData,
  selectedPlan,
}: {
  day: WorkoutDay;
  updateWeekData: (
    weekDay: WeekDays,
    exerciseIndex: number,
    weekIndex: number,
    value: string
  ) => void;

  selectedPlan: WorkoutPlan;
}) {
  useEffect(() => {
    setSingleDay(day);
    setRestDay(day.isRestDay);
  }, [selectedPlan, day]);
  const [expandedDay, setExpandedDay] = useState<WeekDays | null>(null);

  const [singleDay, setSingleDay] = useState<WorkoutDay>(day);
  const [restDay, setRestDay] = useState<boolean>(singleDay.isRestDay);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const [saveSingleDayState, saveSingleDayAction, pending] = useActionState(
    () => saveSingleDayExercises(singleDay, selectedPlan._id),
    initialState
  );

  function addExercise() {
    const newExercise: Exercise = {
      number: (singleDay.exercises.length || 0) + 1,
      name: "",
      tempo: "",
      weekData: Array.from({ length: selectedPlan.weekCount }, (_, i) => ({
        week: i + 1,
        coachData: "",
      })),
    };
    const updatedDay = {
      ...singleDay,
      exercises: [...singleDay.exercises, newExercise],
    };

    setSingleDay(updatedDay);
  }

  function updateExercise(
    exerciseIndex: number,
    field: keyof Exercise,
    value: string
  ) {
    const updatedDay = {
      ...singleDay,
      exercises: singleDay.exercises.map((ex, i) => {
        if (i === exerciseIndex) {
          return { ...ex, [field]: value };
        }
        return ex;
      }),
    };
    setSingleDay(updatedDay);
  }

  function deleteExercise(exerciseNumber: number) {
    if (!selectedPlan) return;
    const updatedDay = {
      ...singleDay,
      exercises: singleDay.exercises
        .filter((ex) => ex.number !== exerciseNumber)
        .map((ex, index) => ({ ...ex, number: index + 1 })),
    };
    setSingleDay(updatedDay);
  }

  function expandDayHandler(event: React.MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      (event.target.tagName === "INPUT" ||
        event.target.tagName === "BUTTON" ||
        event.target.tagName === "SVG")
    )
      return;
    if (restDay) return;

    setExpandedDay(expandedDay === day.weekDay ? null : day.weekDay);
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
            {singleDay.weekDay}
          </p>

          <RestDayCheckBox
            planId={selectedPlan._id}
            weekDay={singleDay.weekDay}
            checkRestDayHandler={checkRestDayHandler}
            isRestDay={restDay}
          />
        </div>
        <div className={restDay ? "opacity-30 pointer-events-none" : undefined}>
          {expandedDay === singleDay.weekDay ? (
            <LuChevronUp className="w-5 h-5" />
          ) : (
            <LuChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {expandedDay === singleDay.weekDay && (
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
                    {singleDay.exercises.map((exercise, index) => (
                      <tr key={index} className="bg-gray-800">
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            //name="exerciseNumber"
                            className="hidden"
                            defaultValue={index + 1}
                          />
                          {exercise.number}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            //name={`exerciseName-${exercise.number}`}
                            value={exercise.name}
                            onChange={(e) =>
                              updateExercise(index, "name", e.target.value)
                            }
                            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            //name={`exerciseTempo-${exercise.number}`}
                            value={exercise.tempo}
                            onChange={(e) =>
                              updateExercise(index, "tempo", e.target.value)
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
                            onClick={() => deleteExercise(exercise.number)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <LuTrash className="w-5 h-5" />
                          </button>
                        </td>
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
              </div>
              <button
                onClick={addExercise}
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                <LuPlus className="w-5 h-5" />
                Add Exercise
              </button>
              <ButtonWithLoading
                isLoading={pending}
                type="submit"
                onClick={() => startTransition(() => saveSingleDayAction())}
                //onClick={async () => saveSingleDayAction()}
                className="flex w-fit items-center gap-2 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Save Changes
              </ButtonWithLoading>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
