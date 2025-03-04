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
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsConfirming(false)}
          className="px-3 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 flex items-center gap-1"
        >
          <MdDelete className="text-lg" />
          Confirm
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-red-600 rounded-lg border border-slate-700 hover:border-red-700 transition-all duration-300 flex items-center gap-2"
    >
      <MdDelete className="text-lg" />
      Remove client
    </button>
  );
}
