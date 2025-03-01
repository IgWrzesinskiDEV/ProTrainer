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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModalHandler}
      />

      <form
        action={formAction}
        className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] 
                   max-h-[90vh] overflow-hidden
                   bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl
                   rounded-xl sm:rounded-2xl shadow-2xl
                   border border-slate-700/50
                   flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <HeadingIcon className="text-2xl sm:text-3xl text-blue-400" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white capitalize">
              {heading}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-hidden custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {trainerDataState.length > 0 ? (
              <motion.ol className="space-y-3" layout>
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
                className="text-center py-8"
              >
                <p className="text-slate-400 text-sm sm:text-base">
                  Add your first {heading.toLowerCase()}
                </p>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Click the button below to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-4 sm:p-6 space-y-4">
          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full group"
          >
            <div
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                          bg-blue-500/10 hover:bg-blue-500/20
                          border border-blue-500/20 hover:border-blue-500/30
                          transition-all duration-200"
            >
              <MdAddCircleOutline className="text-xl sm:text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="text-sm sm:text-base font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
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
                className="space-y-2"
              >
                {formState.errors.map((err) => (
                  <div
                    key={err}
                    className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-red-400 flex-shrink-0"
                      fill="currentColor"
                    >
                      <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 9.5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-8c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1z" />
                    </svg>
                    <p className="text-xs sm:text-sm text-red-400 font-medium">
                      {err}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={closeModalHandler}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-slate-300
                       hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <ButtonWithLoading
              isLoading={isPending}
              className="px-6 sm:px-8 py-2 bg-blue-500 hover:bg-blue-600
                       text-sm sm:text-base font-medium text-white
                       rounded-lg shadow-lg shadow-blue-500/20
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </ButtonWithLoading>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
