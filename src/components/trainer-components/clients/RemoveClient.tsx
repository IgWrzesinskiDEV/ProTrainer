"use client";

import { removeTrainer } from "@/actions/trainers.actions";
import ButtonWithLoading from "@/components/UI/Buttons/ButtonWithLoading";
import CustomToastContent from "@/components/UI/toastify/CustomToast";
import useTransitionWithError from "@/hooks/useTrainsitionWithError";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiUserMinusLine } from "react-icons/ri";

export default function RemoveClient({ clientId }: { clientId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { isPending, onClickHandler } = useTransitionWithError(
    <CustomToastContent
      message="Client removed!"
      CustomIcon={
        <RiUserMinusLine className="text-xl sm:text-2xl text-red-500" />
      }
    />,
    () => removeTrainer(clientId, true)
  );
  const handleRemove = () => {
    // Implementation for removing client
    setIsConfirming(false);
    onClickHandler();
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setIsConfirming(false)}
          className="px-2 sm:px-3 py-1.5  sm:py-2 text-xs sm:text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-md sm:rounded-lg transition-colors duration-300"
          aria-label="Cancel removal"
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md sm:rounded-lg transition-colors duration-300 flex items-center gap-1"
          aria-label="Confirm client removal"
        >
          <MdDelete className="text-base sm:text-lg" />
          <span className="hidden sm:inline">Confirm</span>
        </button>
      </div>
    );
  }

  return (
    <ButtonWithLoading
      onClick={() => setIsConfirming(true)}
      isDisabled={isPending}
      isLoading={isPending}
      size={20}
      className="px-2.5 sm:px-4 min-w-20 sm:min-w-36 disabled:hover:bg-slate-800/30 disabled:hover:border-slate-700 disabled:bg-opacity-30 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-slate-800 hover:bg-red-600 rounded-md sm:rounded-lg border border-slate-700 hover:border-red-700 transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
      aria-label="Remove client"
    >
      <MdDelete className="text-base sm:text-lg" />
      <span className="hidden  sm:inline">Remove client</span>
      <span className="sm:hidden">Remove</span>
    </ButtonWithLoading>
  );
}
