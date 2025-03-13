"use client";

import ExerciseDetailsView from "@/components/exerciseDetails/ExerciseDetailsView";
import ModalUnstyled from "@/components/UI/Modal";

import { useEffect, useRef } from "react";

export default function ExerciseDetailsModal({
  exerciseDetailsJSON,
  isCustom,
}: {
  exerciseDetailsJSON: string;
  isCustom?: boolean;
}) {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  function closeHandler() {
    modalRef.current?.close();
  }

  return (
    <ModalUnstyled ref={modalRef} isIntercepted isBackDropClickClose={false}>
      <div className="w-full max-w-[95vw]  md:max-w-[90vw] lg:max-w-4xl mx-auto planScrollbar trainerDataSquareScrollbar overflow-y-auto ">
        <ExerciseDetailsView
          exerciseDetailJSON={exerciseDetailsJSON}
          modalCloseHandler={closeHandler}
          isCustom={isCustom}
        />
      </div>
    </ModalUnstyled>
  );
}
