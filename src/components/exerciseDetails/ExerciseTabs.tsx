import type React from "react";
import type { Dispatch } from "react";

export default function ExerciseTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<
    React.SetStateAction<"demo" | "muscles" | "instructions">
  >;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
      <button
        onClick={() => setActiveTab("demo")}
        className={`px-2 py-1.5 sm:px-4 sm:py-2 text-xs  sm:text-base rounded-md transition-colors ${
          activeTab === "demo"
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        Exercise Demo
      </button>
      <button
        onClick={() => setActiveTab("muscles")}
        className={`px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base rounded-md transition-colors ${
          activeTab === "muscles"
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        Target Muscles
      </button>
      <button
        onClick={() => setActiveTab("instructions")}
        className={`px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base rounded-md transition-colors ${
          activeTab === "instructions"
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        Instructions
      </button>
    </div>
  );
}
