import { cn } from "@/lib/twMergeUtill";
import type React from "react";
import type { ReactNode } from "react";

export function InfoSection({
  icon,
  title,
  content,
  large = false,
}: {
  icon: ReactNode;
  title: string;
  content: string | React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 
                  border border-gray-700/50 hover:border-blue-500/20 
                  transition-all duration-300 shadow-lg hover:shadow-blue-500/5"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
        <span className="p-2 bg-blue-500/10 rounded-xl mr-3 text-blue-400">
          {icon}
        </span>
        <span className="relative">
          {title}
          <span
            className="absolute -bottom-1 left-0 w-1/2 h-0.5 
                        bg-gradient-to-r from-blue-500 to-transparent"
          />
        </span>
      </h3>
      <div
        className={cn(
          "text-gray-300 font-light leading-relaxed",
          large ? "text-lg" : "text-base"
        )}
      >
        {content}
      </div>
    </div>
  );
}
