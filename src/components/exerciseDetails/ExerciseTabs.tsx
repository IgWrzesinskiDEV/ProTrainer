import { Dispatch } from "react";

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
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("demo")}
        className={`px-4 py-2 rounded-md transition-colors ${
          activeTab === "demo"
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        Exercise Demo
      </button>
      <button
        onClick={() => setActiveTab("muscles")}
        className={`px-4 py-2 rounded-md transition-colors ${
          activeTab === "muscles"
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        Target Muscles
      </button>
      <button
        onClick={() => setActiveTab("instructions")}
        className={`px-4 py-2 rounded-md transition-colors ${
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
