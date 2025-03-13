"use client";

import type React from "react";
import { useActionState, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuDumbbell } from "react-icons/lu";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import MuscleModel from "./MuscleModel";
import { IMuscleStats, Muscle } from "react-body-highlighter";
import { MuscleGroups } from "@/interfaces/workout/IWorkout";
import { addCustomExercise } from "@/actions/customExercise.actions";
import { MdErrorOutline } from "react-icons/md";

const initialState = {
  errors: [],
};

export default function AddCustomExerciseModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [muclesGroup, setMusclesGroup] = useState<Muscle[]>([]);
  const handleModelClick = useCallback(
    ({ muscle }: IMuscleStats | { muscle: MuscleGroups }) => {
      setMusclesGroup((prev) => {
        if (prev.includes(muscle)) {
          return prev.filter((m) => m !== muscle);
        }
        return [...prev, muscle];
      });
    },
    []
  );
  const [formState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      addCustomExercise(prevState, formData, muclesGroup),
    initialState
  );
  useEffect(() => {
    if (formState.success) {
      closeModal();
    }
  }, [formState.success, closeModal]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 "
    >
      <div className="absolute inset-0 bg-black/60" onClick={closeModal} />

      <form
        action={formAction}
        className="relative w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 
                   max-h-[90vh] overflow-hidden 
                   bg-gradient-to-b from-slate-800/95 to-slate-900/95 
                   rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl
                   border border-slate-700/50
                   flex flex-col"
      >
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
            <LuDumbbell className="text-xl sm:text-2xl md:text-3xl text-blue-400" />
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white">
              Add Custom Exercise
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto trainerDataSquareScrollbar scrollBarRectangle">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Exercise Name */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm md:text-base font-medium text-slate-300"
              >
                Exercise Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="exerciseName"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 
                         text-xs sm:text-sm md:text-base text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Barbell Squat"
              />
            </div>

            {/* Category */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="category"
                className="block text-xs sm:text-sm md:text-base font-medium text-slate-300"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 
                         text-xs sm:text-sm md:text-base text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Legs, Core, Arms"
              />
            </div>

            {/* Equipment */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="equipment"
                className="block text-xs sm:text-sm md:text-base font-medium text-slate-300"
              >
                Equipment
              </label>
              <input
                type="text"
                id="equipment"
                name="equipment"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 
                         text-xs sm:text-sm md:text-base text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Barbell, Dumbbells, Bodyweight"
              />
            </div>

            {/* Muscle Groups */}
            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs sm:text-sm md:text-base font-medium text-slate-300">
                Muscle Model
              </label>

              <MuscleModel
                musclesGroup={muclesGroup}
                handleModelClick={handleModelClick}
              />
            </div>

            {/* Instructions */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="instructions"
                className="block text-xs sm:text-sm md:text-base font-medium text-slate-300"
              >
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={4}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 
                         text-xs sm:text-sm md:text-base text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe how to perform this exercise..."
              ></textarea>
            </div>

            {/* Video URL */}
            <div className="space-y-1 sm:space-y-1.5">
              <label
                htmlFor="videoUrl"
                className="block text-xs sm:text-sm md:text-base font-medium text-slate-300"
              >
                Video URL
              </label>
              <input
                id="videoUrl"
                name="videoUrl"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 
                         text-xs sm:text-sm md:text-base text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          {/* Error Messages */}
          <AnimatePresence>
            {formState.errors && formState.errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-1.5 sm:space-y-2"
              >
                {formState.errors.map((err) => (
                  <div
                    key={err}
                    className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    {/* <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0"
                      fill="currentColor"
                    >
                      <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 9.5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-8c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1z" />
                    </svg> */}
                    <MdErrorOutline className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                    <p className="text-xs sm:text-sm md:text-sm text-red-400 font-medium">
                      {err}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-slate-300
                       hover:text-white transition-colors duration-200 touch-manipulation"
            >
              Cancel
            </button>
            <ButtonWithLoading
              isLoading={isPending}
              isDisabled={isPending}
              className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600
                       text-xs sm:text-sm md:text-base font-medium text-white
                       rounded-lg shadow-lg shadow-blue-500/20
                       transition-all duration-200
                       disabled:bg-opacity-30 disabled:cursor-not-allowed touch-manipulation"
            >
              Add Exercise
            </ButtonWithLoading>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
