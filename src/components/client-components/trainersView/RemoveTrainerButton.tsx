"use client";

import { useState, useEffect, useRef } from "react";
import { LuTrash2 } from "react-icons/lu";
import { RiUserMinusLine } from "react-icons/ri";
import { cn } from "@/lib/twMergeUtill";
import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import { removeTrainer } from "@/actions/trainers.actions";
import CustomToastContent from "@/components/UI/toastify/CustomToast";

export default function RemoveTrainerButton({
  trainerId,
}: {
  trainerId: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowConfirm(false);
      }
    };

    if (showConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirm]);

  const { isPending, onClickHandler } = useTransitionWithError(
    <CustomToastContent
      message="Trainer removed!"
      CustomIcon={
        <RiUserMinusLine className="text-xl sm:text-2xl text-red-500" />
      }
    />,
    () => removeTrainer(trainerId, false)
  );

  const handleClick = () => {
    if (showConfirm) {
      onClickHandler();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Auto-hide confirmation after 3 seconds
      // setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          "group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium",
          "transition-all duration-300 transform",
          "shadow-lg hover:shadow-xl active:scale-95",
          showConfirm
            ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-500/20 hover:shadow-red-500/30"
            : "bg-gradient-to-r from-gray-800 to-gray-900 text-white border-gray-700 shadow-gray-900/20 hover:shadow-blue-500/10",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        <LuTrash2
          className={cn(
            "w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-300",
            showConfirm ? "text-white" : "text-red-500 group-hover:text-red-400"
          )}
        />
        <span className="text-white/90 group-hover:text-white whitespace-nowrap">
          {showConfirm ? "Confirm" : "Remove"}
        </span>
      </button>

      {showConfirm && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 sm:mt-3
                     flex items-center justify-center z-10"
        >
          <div
            className={cn(
              "px-2 sm:px-4 text-center py-1.5 sm:py-2 w-28 sm:w-32 bg-gray-900 text-white text-xs sm:text-sm rounded-xl shadow-xl",
              "animate-fade-in ",
              isPending && "opacity-50"
            )}
          >
            Click again to confirm
            <div
              className="absolute left-1/2 -z-10 -translate-x-1/2 -top-2 
                        w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 rotate-45 border-b border-r border-gray-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}
