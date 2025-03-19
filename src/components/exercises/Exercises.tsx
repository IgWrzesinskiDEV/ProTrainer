"use client";

import { useRef } from "react";
import ListWrapper from "../UI/list/ListWrapper";
import type { ExerciseDetails } from "../exerciseDetails/ExerciseDetailsView";
import { LuDumbbell } from "react-icons/lu";

import ExercisePreview from "./ExercisePreview";
import ModalUnstyled from "../UI/Modal";
import AddCustomExerciseModal from "./AddCustomExerciseModal";
import type { CustomExerciseDetails } from "@/interfaces/workout/IWorkout";

export default function Exercises({
  exercises,
  isCustom,
}: {
  exercises: string;
  isCustom: boolean;
}) {
  const exercisesList: ExerciseDetails[] | CustomExerciseDetails[] =
    JSON.parse(exercises);
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  function openModal() {
    modalRef.current?.open();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  return (
    <>
      <ListWrapper
        items={exercisesList}
        renderItem={(exercise) => (
          <ExercisePreview exercise={exercise} isCustom={isCustom} />
        )}
        itemsPerPage={12}
        placeholder="Search exercises..."
        title={isCustom ? "Your exercise Library" : "Exercise Library"}
        text={
          isCustom ? "Browse your exercises" : "Browse our exercise library"
        }
        Icon={<LuDumbbell className="text-blue-400" />}
        isCustom={isCustom}
        onAddCustom={openModal}
        fallBackText="exercises"
      />
      <ModalUnstyled ref={modalRef}>
        <AddCustomExerciseModal closeModal={closeModal} />
      </ModalUnstyled>
    </>
  );
}
