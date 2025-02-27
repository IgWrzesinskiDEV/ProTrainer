"use client";
import { useEffect, useState } from "react";
import { LuMinus, LuPlus, LuCalendarX, LuCalendarPlus } from "react-icons/lu";

import {
  ExerciseDetailsShort,
  WorkoutPlan,
} from "@/interfaces/workout/IWorkout";
import { useActionState, useRef, useTransition } from "react";
import {
  addEmptyWorkoutPlan,
  addEmptyWeek,
  deleteLatestWeek,
} from "@/actions/trainerClients.actions";
import SingleDay from "./SingleDay";
import InputWithErrorHandler from "@/components/UI/input/InputWithErrorHandler";
import PlanSearchSelect from "@/components/UI/Select/PlanSearchSelect";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";

import ModalUnstyled from "@/components/UI/Modal";
import ConfirmDeletePlan from "./ConfirmDeletePlan";
const initialState = {
  errors: [],
};
export default function ClientPlans({
  clientId,
  clientPlans,
  availableExercises,
}: {
  clientId: string;
  clientPlans: string;
  availableExercises: string;
}) {
  const [formState, addEmptyPlanAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      addEmptyWorkoutPlan(prevState, formData, clientId),
    initialState
  );
  const hasError = (formState?.errors?.length ?? 0) > 0;
  const workoutPlans: WorkoutPlan[] = JSON.parse(clientPlans);
  const availableExercisesNamesList: ExerciseDetailsShort[] =
    JSON.parse(availableExercises);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(
    workoutPlans[0] || null
  );

  useEffect(() => {
    if (clientPlans) {
      const plans: WorkoutPlan[] = JSON.parse(clientPlans);
      setSelectedPlan(
        plans.find((plan) => plan._id === selectedPlan?._id) || null
      );
    }
  }, [clientPlans, selectedPlan?._id]);

  const [isPendingAddWeek, startTransitionAddWeek] = useTransition();
  const [isPendingRemoveLatestWeek, startTransitionRemoveLatestWeek] =
    useTransition();

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Workout Plans
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <PlanSearchSelect
            workoutPlans={workoutPlans}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
          />
          <form
            action={addEmptyPlanAction}
            className="flex items-center justify-center gap-4"
          >
            <InputWithErrorHandler
              hasError={hasError}
              errorMessage={formState.errors?.[0]}
            />

            <ButtonWithLoading
              isLoading={isPending}
              type="submit"
              className="flex items-center justify-center w-fit text-base mt-0 gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <LuPlus className="w-5 h-5" />
              Add New Plan
            </ButtonWithLoading>
          </form>

          {selectedPlan && (
            <>
              <ButtonWithLoading
                isLoading={isPendingAddWeek}
                className="flex items-center w-15 gap-2 mt-0 px-4 text-base mx-0 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() =>
                  startTransitionAddWeek(async () => {
                    await addEmptyWeek(selectedPlan._id, clientId);
                  })
                }
              >
                <LuCalendarPlus className="w-5 h-5" />
                Add Week
              </ButtonWithLoading>
              <ButtonWithLoading
                isLoading={isPendingRemoveLatestWeek}
                isDisabled={selectedPlan.weekCount === 0}
                loadingClass="bg-opacity-50 hover:bg-red-500 pointer-events-none"
                className="flex items-center gap-2 mt-0 px-4  py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-30 disabled:hover:bg-red-500"
                onClick={() =>
                  startTransitionRemoveLatestWeek(async () => {
                    await deleteLatestWeek(selectedPlan._id, clientId);
                  })
                }
              >
                <LuCalendarX className="w-5 h-5" />
                Remove latest week
              </ButtonWithLoading>
              <button
                onClick={modalRef.current?.open}
                className="flex items-center ml-auto gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <LuMinus className="w-5 h-5" />
                Remove workout plan
              </button>
            </>
          )}
        </div>

        {selectedPlan &&
          selectedPlan.days.map((day) => (
            <SingleDay
              availableExercisesNamesList={availableExercisesNamesList}
              day={day}
              key={day.weekDay}
              selectedPlan={selectedPlan}
            />
          ))}
      </div>
      <ModalUnstyled ref={modalRef} isBackDropClickClose={false}>
        <ConfirmDeletePlan
          clientId={clientId}
          planId={selectedPlan?._id}
          closeModal={modalRef.current?.close}
          planName={selectedPlan?.planName}
        />
      </ModalUnstyled>
    </>
  );
}
