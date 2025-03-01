"use client";

import { motion } from "framer-motion";
import { VscDebugBreakpointFunction } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import type { TrainerAdditionalDataHeadingType } from "@/interfaces/trainers/ITrainer";

export default function TrainerListItem({
  heading,
  handleRemoveItem,
  item,
  index,
}: {
  heading: TrainerAdditionalDataHeadingType;
  handleRemoveItem: (index: number) => void;
  item: string;
  index: number;
}) {
  return (
    <motion.div
      layout
      className="group relative flex items-start  gap-2 p-3 sm:p-4
                 bg-slate-800/30 hover:bg-slate-800/50
                 border border-slate-700/50 hover:border-slate-600/50
                 rounded-lg transition-all duration-200"
    >
      <VscDebugBreakpointFunction className="text-blue-400 text-lg sm:text-xl mt-1 flex-shrink-0" />

      <div className="flex-1">
        <input
          type="text"
          name={heading.toLowerCase()}
          defaultValue={item}
          placeholder={`Enter ${heading.toLowerCase()}`}
          className="w-full bg-transparent text-sm sm:text-base text-white 
                     placeholder-slate-400 font-medium
                     focus:outline-none focus:ring-0"
        />
      </div>

      <button
        type="button"
        onClick={() => handleRemoveItem(index)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   p-1 rounded-full hover:bg-red-500/10"
      >
        <IoMdRemoveCircleOutline className="text-lg sm:text-xl text-red-400 hover:text-red-300 transition-colors" />
      </button>
    </motion.div>
  );
}
