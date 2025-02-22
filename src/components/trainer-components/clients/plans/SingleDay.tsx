"use client";
import {
  Exercise,
  WorkoutDay,
  WeekDays,
  WorkoutPlan,
  WeekData,
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
import { LuPlus, LuChevronDown, LuChevronUp } from "react-icons/lu";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import ExerciseActions from "./ExerciseActions";
import InputFloatingLabel from "@/components/UI/input/InputWithFloatingLabel";

const initialState = {
  errors: [],
};
export default function SingleDay({
  day,

  selectedPlan,
}: {
  day: WorkoutDay;

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
        weekNumber: i + 1,
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
    exerciseNumber: number,
    field: keyof Exercise,
    value: string
  ) {
    const updatedDay = {
      ...singleDay,
      exercises: singleDay.exercises.map((ex) => {
        if (ex.number === exerciseNumber) {
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

  function updateWeekData(
    exerciseNumber: number,
    weekNumber: number,
    field: keyof WeekData,
    value: string
  ) {
    if (!selectedPlan) return;
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
              <div className="overflow-x-auto w-full planScrollbar">
                <table className="w-full border-separate border-spacing-0 ">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="sticky left-0 top-0 z-10 bg-gray-700  border-t border-r border-gray-600 px-4 py-2 text-left w-12">
                        #
                      </th>
                      <th className="sticky left-10 z-10 bg-gray-700 border-t border-r border-gray-600 px-4 py-2 text-left ">
                        <p className="w-60">Exercise</p>
                      </th>
                      <th className="sticky left-[312px] z-10 border-t border-r bg-gray-700 border-gray-600 px-4 py-2 ">
                        <p className="w-32">Tempo</p>
                      </th>

                      {Array.from(
                        { length: selectedPlan.weekCount },
                        (_, i) => (
                          <th
                            key={i}
                            colSpan={2}
                            className="border-t border-r border-gray-600 px-4 py-2 text-left w-48 text-nowrap"
                          >
                            Week {i + 1}
                          </th>
                        )
                      )}
                      <th className="border-t border-r border-gray-600 px-4 py-2 text-left w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleDay.exercises.map((exercise) => (
                      <tr key={exercise.number} className="bg-gray-800">
                        <td className="sticky left-0 z-10 bg-gray-800 border-b  border-r border-gray-600 px-4 py-2 w-12">
                          {exercise.number}
                        </td>
                        <td className="sticky left-10 z-10 bg-gray-800 border-b border-r border-gray-600 px-4 py-2 w-60">
                          <InputFloatingLabel
                            forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-exerciseName`}
                            label="Exercise name"
                            type="text"
                            value={exercise.name || ""}
                            onChange={(e) =>
                              updateExercise(
                                exercise.number,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="sticky left-[312px] z-10 bg-gray-800 border-b border-r border-gray-600 px-4 py-2 w-40">
                          <InputFloatingLabel
                            forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-exerciseTempo`}
                            label="Tempo"
                            type="text"
                            value={exercise.tempo || ""}
                            onChange={(e) =>
                              updateExercise(
                                exercise.number,
                                "tempo",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        {exercise.weekData.map((week, index) => (
                          <Fragment
                            key={`${exercise.number}-${week.weekNumber}-${index}`}
                          >
                            <td className="border-b border-gray-600 -z-10 px-4 py-2 w-24">
                              <InputFloatingLabel
                                forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
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
                              />
                            </td>
                            <td className="border-b border-r border-gray-600 px-4 -z-10 py-3 w-24">
                              <InputFloatingLabel
                                forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
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
                              />
                            </td>
                          </Fragment>
                        ))}
                        <td className="border-b border-r   border-gray-600 px-4 py-2 w-20">
                          <ExerciseActions
                            deleteExercise={deleteExercise}
                            exercise={exercise}
                          />
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
