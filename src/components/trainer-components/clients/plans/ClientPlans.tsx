"use client";
import { useEffect, useState } from "react";
import { LuMinus, LuPlus, LuCalendarX, LuCalendarPlus } from "react-icons/lu";

import type {
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

import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";

import ModalUnstyled from "@/components/UI/Modal";
import ConfirmDeletePlan from "./ConfirmDeletePlan";
import ClientSectionWraper from "../ClientSectionWraper";
import { MdFitnessCenter } from "react-icons/md";
import PlanSelect from "@/components/client-components/plans/PlanSelecter";

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

  console.log("selectedPlan", selectedPlan);
  useEffect(() => {
    if (clientPlans) {
      const plans: WorkoutPlan[] = JSON.parse(clientPlans);
      setSelectedPlan(
        plans.find((plan) => plan._id === selectedPlan?._id) || null
      );
    }
  }, [clientPlans, selectedPlan?._id]);
  useEffect(() => {
    if (formState.success) {
      setSelectedPlan(
        workoutPlans.find((plan) => {
          return plan._id === formState.newPlanId;
        }) || null
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  const [isPendingAddWeek, startTransitionAddWeek] = useTransition();
  const [isPendingRemoveLatestWeek, startTransitionRemoveLatestWeek] =
    useTransition();

  return (
    <>
      <ClientSectionWraper
        title="Workout Plans"
        Icon={<MdFitnessCenter className="w-6 h-6 text-blue-400" />}
      >
        {/* Plan selector and new plan form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-start">
          <div className="w-full">
            <PlanSelect
              workoutPlans={workoutPlans}
              selectedPlanId={selectedPlan?._id || null}
              setSelectedPlan={setSelectedPlan}
            />
          </div>

          <form
            action={addEmptyPlanAction}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
          >
            <div className="w-full sm:flex-1">
              <InputWithErrorHandler
                hasError={hasError}
                errorMessage={formState.errors?.[0]}
                placeholder="Enter new plan name"
                autoFocus={false}
              />
            </div>

            <ButtonWithLoading
              isLoading={isPending}
              type="submit"
              className="flex items-center justify-center w-full sm:w-auto text-sm gap-2 px-5 py-2.5 h-11 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
            >
              <LuPlus className="w-4 h-4" />
              Add New Plan
            </ButtonWithLoading>
          </form>
        </div>

        {/* Action buttons for selected plan */}
        {selectedPlan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <ButtonWithLoading
              isLoading={isPendingAddWeek}
              className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md text-sm font-medium"
              onClick={() =>
                startTransitionAddWeek(async () => {
                  await addEmptyWeek(selectedPlan._id, clientId);
                })
              }
            >
              <LuCalendarPlus className="w-4 h-4" />
              Add Week
            </ButtonWithLoading>

            <ButtonWithLoading
              isLoading={isPendingRemoveLatestWeek}
              isDisabled={selectedPlan.weekCount === 0}
              loadingClass="bg-opacity-50 hover:bg-red-600 pointer-events-none"
              className="flex items-center justify-center disabled:hover:bg-red-600 gap-2 px-4 py-2.5 h-11 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
              onClick={() =>
                startTransitionRemoveLatestWeek(async () => {
                  await deleteLatestWeek(selectedPlan._id, clientId);
                })
              }
            >
              <LuCalendarX className="w-4 h-4" />
              Remove Latest Week
            </ButtonWithLoading>

            <button
              onClick={() => modalRef.current?.open()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md text-sm font-medium"
            >
              <LuMinus className="w-4 h-4" />
              Remove Plan
            </button>
          </div>
        )}

        {selectedPlan && selectedPlan.days.length > 0 ? (
          <div className="space-y-3">
            {selectedPlan.days.map((day) => (
              <SingleDay
                availableExercisesNamesList={availableExercisesNamesList}
                day={day}
                key={day.weekDay}
                selectedPlan={selectedPlan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No workout days available. Create a new plan or add days to the
            current plan.
          </div>
        )}
      </ClientSectionWraper>

      <ModalUnstyled ref={modalRef} isBackDropClickClose={false}>
        <ConfirmDeletePlan
          clientId={clientId}
          planId={selectedPlan?._id}
          closeModal={() => modalRef.current?.close()}
          planName={selectedPlan?.planName}
        />
      </ModalUnstyled>
    </>
  );
}
