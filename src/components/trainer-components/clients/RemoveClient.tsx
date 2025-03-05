"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function RemoveClient({ clientId }: { clientId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleRemove = () => {
    // Implementation for removing client
    console.log("Removing client:", clientId);
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setIsConfirming(false)}
          className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-md sm:rounded-lg transition-colors duration-300"
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
    <button
      onClick={() => setIsConfirming(true)}
      className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-slate-800 hover:bg-red-600 rounded-md sm:rounded-lg border border-slate-700 hover:border-red-700 transition-all duration-300 flex items-center gap-1.5 sm:gap-2"
      aria-label="Remove client"
    >
      <MdDelete className="text-base sm:text-lg" />
      <span className="hidden  sm:inline">Remove client</span>
      <span className="sm:hidden">Remove</span>
    </button>
  );
}
