import type React from "react";
import { LuInfo } from "react-icons/lu";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  unit?: string;
  change?: number | null;
  additionalContent?: React.ReactNode;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  unit,
  change,
  additionalContent,
  iconColor = "text-blue-400",
}: StatCardProps) {
  // Handle the change indicator color
  const getChangeClasses = (change: number) => {
    if (title === "BMI") {
      // For BMI, increasing is negative, decreasing is positive
      return change > 0
        ? "bg-red-500/10 text-red-400"
        : change < 0
          ? "bg-green-500/10 text-green-400"
          : "bg-gray-500/10 text-gray-400";
    }

    // For other metrics, increasing is positive, decreasing is negative
    return change > 0
      ? "bg-green-500/10 text-green-400"
      : change < 0
        ? "bg-red-500/10 text-red-400"
        : "bg-gray-500/10 text-gray-400";
  };

  return (
    <div className="bg-gray-800/50 relative rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={iconColor}>{icon}</span>
          <p className="text-gray-400 text-sm">{title}</p>

          {/* Add estimated indicator for Body Fat */}
          {title === "Body Fat" && (
            <div className="group relative">
              <LuInfo className="h-3.5 w-3.5 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max max-w-[180px] rounded bg-gray-900 px-2 py-1 text-xs text-gray-200 opacity-0 shadow transition-opacity group-hover:opacity-100 pointer-events-none">
                Estimated value based on BMI, age, and sex
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
        {change !== null && change !== undefined && (
          <div
            className={`text-xs px-2 py-1 rounded-full ${getChangeClasses(change)}`}
          >
            {change > 0 ? "+" : ""}
            {change.toFixed(1)}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-white mt-2">
          {value !== 0 && value !== "0" ? value : "N/A"}
          {value !== 0 && value !== "N/A" && unit && (
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          )}
        </p>
        {title === "Body Fat" && value !== 0 && value !== "N/A" && (
          <span className="text-xs text-gray-400 mt-0.5">Estimated</span>
        )}
        <div className="absolute top-2 right-2">{additionalContent}</div>
      </div>
    </div>
  );
}
