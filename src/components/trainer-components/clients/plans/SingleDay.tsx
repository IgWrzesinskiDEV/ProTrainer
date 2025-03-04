"use client";
import {
  Exercise,
  WorkoutDay,
  WeekDays,
  WorkoutPlan,
  WeekData,
  ExerciseDetailsShort,
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
import { LuPlus, LuChevronDown, LuChevronUp, LuSave } from "react-icons/lu";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import ExerciseActions from "./ExerciseActions";
import InputFloatingLabel from "@/components/UI/input/InputWithFloatingLabel";
import SaveChangesToast from "@/components/UI/toastify/SaveChangesToast";
import { toastify } from "@/components/UI/Toastify";

import ExerciseSelecter from "./ExerciseSelecter";

export interface ExerciseDe {
  id: number;
  name: string;
  videoUrl?: string;
  muscleGroups?: string[];
  muscleModelImage?: string;
  instructions?: string[];
  description: string;
}

const initialState = {
  errors: [],
};

export default function SingleDay({
  day,
  availableExercisesNamesList,
  selectedPlan,
}: {
  day: WorkoutDay;
  availableExercisesNamesList: ExerciseDetailsShort[];
  selectedPlan: WorkoutPlan;
}) {
  useEffect(() => {
    setSingleDay(day);
    setRestDay(day.isRestDay);
  }, [day]);

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
    value: string,
    exerciseDetailsIdValue?: string
  ) {
    const updatedDay = {
      ...singleDay,
      exercises: singleDay.exercises.map((ex) => {
        if (ex.number === exerciseNumber) {
          if (
            exerciseDetailsIdValue !== undefined &&
            exerciseDetailsIdValue !== ""
          ) {
            return {
              ...ex,
              [field]: value,
              exerciseDetailsId: exerciseDetailsIdValue,
            };
          }

          if (field === "name") {
            delete ex.exerciseDetailsId;
          }

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
  const classNameAdded =
    "bg-gray-800 border border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500 rounded-md px-3 py-2 w-full transition-colors hover:border-gray-600 focus:ring-2 focus:ring-blue-500/20 outline-none";
  const classNameLabel = "bg-gray-800  p-0";
  return (
    <div className="bg-gray-800/80 rounded-lg border border-gray-700/50 shadow-md overflow-hidden">
      <div
        className={`flex items-center justify-between p-4 ${
          !restDay
            ? "cursor-pointer hover:bg-gray-700/50 transition-colors"
            : "cursor-default pointer-events-none"
        }`}
        onClick={expandDayHandler}
      >
        <div className="flex items-center gap-4">
          <p
            className={`text-lg font-medium text-white ${
              restDay && "opacity-40"
            }`}
          >
            {singleDay.weekDay}
          </p>

          <RestDayCheckBox
            planId={selectedPlan._id}
            weekDay={singleDay.weekDay}
            checkRestDayHandler={checkRestDayHandler}
            isRestDay={restDay}
          />
        </div>
        <div className={restDay ? "opacity-40 pointer-events-none" : undefined}>
          {expandedDay === singleDay.weekDay ? (
            <LuChevronUp className="w-5 h-5 text-blue-400" />
          ) : (
            <LuChevronDown className="w-5 h-5 text-blue-400" />
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
            <div className="p-4 border-t border-gray-700/50">
              <div className="overflow-y-visible overflow-x-auto relative z-10 planScrollbar">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left w-12 text-gray-300 font-medium">
                        #
                      </th>
                      <th className=" left-10 top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left text-gray-300 font-medium">
                        <p className="w-60">Exercise</p>
                      </th>
                      <th className=" left-[312px] top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 text-left px-4 py-2.5 text-gray-300 font-medium">
                        <p className="w-32">Tempo</p>
                      </th>

                      {Array.from(
                        { length: selectedPlan.weekCount },
                        (_, i) => (
                          <th
                            key={i}
                            colSpan={2}
                            className="bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left w-48 text-nowrap text-gray-300 font-medium"
                          >
                            Week {i + 1}
                          </th>
                        )
                      )}
                      <th className="bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left w-20 text-gray-300 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleDay.exercises.map((exercise) => (
                      <tr key={exercise.number} className="">
                        <td className="sticky left-0 z-30 select-none bg-gray-800 hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-12 group/cell">
                          <span className="text-gray-400">
                            {exercise.number}
                          </span>
                          <div className="absolute top-1/2 left-full -translate-y-1/2 ml-2 opacity-0 invisible group-hover/cell:opacity-100 group-hover/cell:visible transition-all duration-200 transform scale-95 group-hover/cell:scale-100 pointer-events-none z-40">
                            <div className="bg-gray-900 text-white text-sm rounded-md py-1.5 px-3 shadow-lg max-w-xs">
                              <p className="whitespace-normal">
                                {exercise.name || "No exercise selected"}
                              </p>
                              <div className="absolute h-2 w-2 bg-gray-900 transform rotate-45 top-1/2 -translate-y-1/2 -left-1"></div>
                            </div>
                          </div>
                        </td>
                        <td className=" left-10 z-10 bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-60">
                          <ExerciseSelecter
                            exerciseNumber={exercise.number}
                            availableExercises={availableExercisesNamesList}
                            weekDay={singleDay.weekDay}
                            defaultValue={exercise.name}
                            updateExercise={updateExercise}
                            inputClassName={classNameAdded}
                            labelClassName={classNameLabel}
                          />
                        </td>
                        <td className=" left-[312px] z-10 bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-40">
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
                            classNameAdded={classNameAdded}
                            classNameLabel={classNameLabel}
                          />
                        </td>

                        {exercise.weekData.map((week, index) => (
                          <Fragment
                            key={`${exercise.number}-${week.weekNumber}-${index}`}
                          >
                            <td className="bg-gray-800 group-hover:bg-gray-750 border-b border-gray-700/50 px-4 py-3 w-24">
                              <InputFloatingLabel
                                forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
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
                                classNameAdded={classNameAdded}
                                classNameLabel={classNameLabel}
                              />
                            </td>
                            <td className="bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-24">
                              <InputFloatingLabel
                                forHTMLLabel={`${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
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
                                classNameAdded={classNameAdded}
                                classNameLabel={classNameLabel}
                              />
                            </td>
                          </Fragment>
                        ))}
                        <td className="bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-20">
                          <ExerciseActions
                            deleteExercise={deleteExercise}
                            exercise={exercise}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex gap-2 mt-4 text-red-400">
                  {saveSingleDayState?.errors &&
                    saveSingleDayState.errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <button
                  onClick={addExercise}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md text-sm w-full sm:w-auto justify-center"
                >
                  <LuPlus className="w-4 h-4" />
                  Add Exercise
                </button>

                <ButtonWithLoading
                  isDisabled={pending}
                  isLoading={pending}
                  type="submit"
                  onClick={() =>
                    startTransition(() => {
                      saveSingleDayAction();
                      toastify(<SaveChangesToast />, 3000);
                    })
                  }
                  className="flex w-full sm:w-auto h-10 items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md text-sm justify-center sm:ml-auto"
                >
                  <LuSave className="w-4 h-4" />
                  Save Changes
                </ButtonWithLoading>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
