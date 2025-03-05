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
import {
  LuPlus,
  LuChevronDown,
  LuChevronUp,
  LuSave,
  LuTrash,
} from "react-icons/lu";
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
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

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

  function toggleExerciseDetails(exerciseNumber: number) {
    setActiveExercise(
      activeExercise === exerciseNumber ? null : exerciseNumber
    );
  }

  const classNameAdded =
    "bg-gray-800 border border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500 rounded-md px-3 py-2 w-full transition-colors hover:border-gray-600 focus:ring-2 focus:ring-blue-500/20 outline-none";
  const classNameLabel = "bg-gray-800 p-0";

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
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-700/50">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-y-visible overflow-x-auto relative z-10 planScrollbar">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="sticky left-0 top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left w-12 text-gray-300 font-medium">
                        #
                      </th>
                      <th className=" top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 px-4 py-2.5 text-left text-gray-300 font-medium">
                        <p className="w-60">Exercise</p>
                      </th>
                      <th className=" top-0 z-20 bg-gray-900 border-b border-r border-gray-700/70 text-left px-4 py-2.5 text-gray-300 font-medium">
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
                        <td className=" z-10 bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-60">
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
                        <td className=" z-10 bg-gray-800 group-hover:bg-gray-750 border-b border-r border-gray-700/50 px-4 py-3 w-40">
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
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-6">
                {singleDay.exercises.map((exercise) => (
                  <div
                    key={exercise.number}
                    className="bg-gray-750 rounded-lg border border-gray-700/50 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 bg-gray-800 cursor-pointer"
                      onClick={() => toggleExerciseDetails(exercise.number)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                          {exercise.number}
                        </span>
                        <h3 className="font-thin text-sm text-white truncate max-w-[170px]">
                          {exercise.name || "No exercise selected"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <ExerciseActions
                          deleteExercise={deleteExercise}
                          exercise={exercise}
                        /> */}
                        {activeExercise === exercise.number ? (
                          <LuChevronUp className="w-5 h-5 text-blue-400" />
                        ) : (
                          <LuChevronDown className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeExercise === exercise.number && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden relative"
                        >
                          <div className="flex items-center justify-center absolute top-1 right-1 z-20">
                            <button
                              onClick={() => {
                                setActiveExercise(null);
                                deleteExercise(exercise.number);
                              }}
                              className="p-3 rounded-md hover:bg-blue-500/20 transition-colors"
                            >
                              <LuTrash className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors" />
                            </button>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="space-y-5 relative">
                              <label className="text-base font-medium text-gray-300">
                                Exercise
                              </label>

                              <ExerciseSelecter
                                exerciseNumber={exercise.number}
                                availableExercises={availableExercisesNamesList}
                                weekDay={singleDay.weekDay}
                                defaultValue={exercise.name}
                                updateExercise={updateExercise}
                                inputClassName={classNameAdded}
                                labelClassName={classNameLabel}
                              />
                            </div>

                            <div className="space-y-3">
                              <label className="text-base font-medium text-gray-300">
                                Tempo
                              </label>
                              <InputFloatingLabel
                                forHTMLLabel={`mobile-${singleDay.weekDay}-${exercise.number}-exerciseTempo`}
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
                            </div>

                            {exercise.weekData.map((week, index) => (
                              <div
                                key={`mobile-${exercise.number}-${week.weekNumber}-${index}`}
                                className="pt-3 border-t border-gray-700/30"
                              >
                                <h4 className="text-base font-medium text-gray-300 mb-3">
                                  Week {week.weekNumber}
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="space-y-2">
                                    <InputFloatingLabel
                                      forHTMLLabel={`mobile-${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-trainerData`}
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
                                  </div>
                                  <div className="space-y-2">
                                    <InputFloatingLabel
                                      forHTMLLabel={`mobile-${singleDay.weekDay}-${exercise.number}-${week.weekNumber}-clientData`}
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
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
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

              <div className="flex gap-2 mt-4 text-red-400">
                {saveSingleDayState?.errors &&
                  saveSingleDayState.errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
