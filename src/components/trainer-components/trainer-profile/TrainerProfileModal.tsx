"use client";

import type React from "react";

import { MdAddCircleOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import TrainerListItem from "./TrainerListItem";
import { addAdditionalTrainerData } from "@/actions/trainers.actions";
import { useActionState } from "react";
import type { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";
import { motion, AnimatePresence } from "framer-motion";

const initialState = {
  errors: [],
};

export default function TrainerProfileModal({
  heading,
  HeadingIcon,
  trainerData,
  closeModalHandler,
}: {
  heading: TrainerAdditionalDataHeadingType;
  HeadingIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  trainerData: string[];
  closeModalHandler: () => void;
}) {
  const [trainerDataState, setTrainerDataState] = useState(trainerData);
  const [formState, formAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      addAdditionalTrainerData(prevState, formData, heading),
    initialState
  );

  useEffect(() => {
    if (formState.success) {
      closeModalHandler();
    }
  }, [formState.success, closeModalHandler]);

  function handleAddItem() {
    setTrainerDataState([...trainerDataState, ""]);
  }

  function handleRemoveItem(index: number) {
    setTrainerDataState((prevState) => prevState.filter((_, i) => i !== index));
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeModalHandler}
      />

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
            <HeadingIcon className="text-xl sm:text-2xl md:text-3xl text-blue-400" />
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white capitalize">
              {heading}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {trainerDataState.length > 0 ? (
              <motion.ol className="space-y-2 sm:space-y-3" layout>
                {trainerDataState.map((item, index) => (
                  <motion.li
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrainerListItem
                      heading={heading}
                      handleRemoveItem={handleRemoveItem}
                      item={item}
                      index={index}
                    />
                  </motion.li>
                ))}
              </motion.ol>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4 sm:py-6 md:py-8"
              >
                <p className="text-slate-400 text-xs sm:text-sm md:text-base">
                  Add your first {heading.toLowerCase()}
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm mt-1">
                  Click the button below to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full group touch-manipulation"
          >
            <div
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg
                          bg-blue-500/10 hover:bg-blue-500/20
                          border border-blue-500/20 hover:border-blue-500/30
                          transition-all duration-200"
            >
              <MdAddCircleOutline className="text-lg sm:text-xl md:text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                Add New {heading}
              </span>
            </div>
          </button>

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
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0"
                      fill="currentColor"
                    >
                      <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 9.5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-8c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1z" />
                    </svg>
                    <p className="text-[10px] sm:text-xs md:text-sm text-red-400 font-medium">
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
              onClick={closeModalHandler}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium text-slate-300
                       hover:text-white transition-colors duration-200 touch-manipulation"
            >
              Cancel
            </button>
            <ButtonWithLoading
              isLoading={isPending}
              className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600
                       text-xs sm:text-sm md:text-base font-medium text-white
                       rounded-lg shadow-lg shadow-blue-500/20
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              Save Changes
            </ButtonWithLoading>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
