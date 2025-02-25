"use client";

import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { removeTrainer } from "@/actions/trainers.actions";
import { RiUserMinusLine } from "react-icons/ri";

import CustomToastContent from "@/components/UI/toastify/CustomToast";
import { cn } from "@/lib/twMergeUtill";
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
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseLeave={() => setShowConfirm(false)}
        className={`
          flex items-center gap-1.5  text-sm font-medium
          shadow-sm transition-all duration-300  py-2 px-4  rounded-lg  
          ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
          ${
            showConfirm
              ? "bg-gradient-to-r from-white-500 to-rose-500 text-white  hover:from-red-600 hover:to-rose-600"
              : "bg-red-600 hover:bg-red-700 text-white "
          }
          ${isPending && "opacity-50 pointer-events-none"}
          hover:shadow-lg 

        `}
      >
        <LuTrash2 className={`w-4 h-4 text-white`} />
        <span className="text-white/90 hover:text-white">
          {showConfirm ? "Confirm remove" : "Remove client"}
        </span>
      </button>

      {/* Tooltip */}
      {showConfirm && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-full px-3 py-1.5 border-gray-900 bg-blue-500 border-2 text-white text-xs rounded-lg shadow-lg whitespace-nowrap",
            isPending && "opacity-50 pointer-events-none"
          )}
        >
          Click again to remove
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-blue-500 rotate-45" />
        </div>
      )}
    </div>
  );
}
