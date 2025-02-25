"use client";

import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { removeTrainer } from "@/actions/trainers.actions";
import { RiUserMinusLine } from "react-icons/ri";

import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { cn } from "@/lib/twMergeUtill";
export default function RemoveTrainerButton({
  trainerId,
}: {
  trainerId: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { isPending, onClickHandler } = useTransitionWithError(
    <CustomToastContent
      message="Trainer removed!"
      CustomIcon={<RiUserMinusLine className="text-2xl text-red-500" />}
    />,
    () => removeTrainer(trainerId, false)
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
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseLeave={() => setShowConfirm(false)}
        className={`
          flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium
          rounded-full shadow-sm transition-all duration-300
          ${
            showConfirm
              ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-500/20 hover:shadow-red-500/30 hover:from-red-600 hover:to-rose-600"
              : "bg-gradient-to-r from-gray-900 to-blue-900 text-white  border-blue-400/20 shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-gray-800 hover:to-blue-800"
          }
          ${isPending && "opacity-50 pointer-events-none"}
          hover:shadow-lg 

        `}
      >
        <LuTrash2
          className={`w-4 h-4 ${showConfirm ? "text-white" : "text-red-500"}`}
        />
        <span className="text-white/90 hover:text-white">
          {showConfirm ? "Confirm remove" : "Remove trainer"}
        </span>
      </button>

      {/* Tooltip */}
      {showConfirm && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-full px-3 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap",
            isPending && "opacity-50 pointer-events-none"
          )}
        >
          Click again to remove
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
}
