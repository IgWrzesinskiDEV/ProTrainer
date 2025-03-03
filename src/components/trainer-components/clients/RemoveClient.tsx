"use client";

import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { removeTrainer } from "@/actions/trainers.actions";
import { RiUserMinusLine } from "react-icons/ri";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { motion } from "framer-motion";

export default function RemoveClient({ clientId }: { clientId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { isPending, onClickHandler } = useTransitionWithError(
    <CustomToastContent
      message="Client removed!"
      CustomIcon={<RiUserMinusLine className="text-2xl text-red-500" />}
    />,
    () => removeTrainer(clientId, true)
  );

  const handleClick = () => {
    if (showConfirm) {
      onClickHandler();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="relative ">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        onMouseLeave={() => setShowConfirm(false)}
        disabled={isPending}
        className={`
          relative group flex items-center gap-2 w-52
          px-4 py-2.5 sm:px-5 sm:py-3 justify-center
          text-sm sm:text-base font-medium
          rounded-xl overflow-hidden
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            showConfirm
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-700/50 hover:bg-gray-600/50"
          }
        `}
      >
        {/* Background animation */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500
          transition-transform duration-300 ease-out
          ${showConfirm ? "translate-x-0" : "translate-x-full"}
        `}
        />

        {/* Content */}
        <div className="relative flex items-center gap-2">
          <LuTrash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="text-white">
            {showConfirm ? "Confirm remove" : "Remove client"}
          </span>
        </div>

        {/* Loading spinner */}
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </motion.button>

      {/* Confirmation Tooltip */}
    </div>
  );
}
