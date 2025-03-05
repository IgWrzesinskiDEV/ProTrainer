"use client";

import ExerciseDetailsView from "@/components/exerciseDetails/ExerciseDetailsView";
import ModalUnstyled from "@/components/UI/Modal";

import { useEffect, useRef } from "react";

export default function ExerciseDetailsModal({
  exerciseDetailsJSON,
}: {
  exerciseDetailsJSON: string;
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
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-4xl mx-auto">
        <ExerciseDetailsView
          exerciseDetailJSON={exerciseDetailsJSON}
          modalCloseHandler={closeHandler}
        />
      </div>
    </ModalUnstyled>
  );
}
