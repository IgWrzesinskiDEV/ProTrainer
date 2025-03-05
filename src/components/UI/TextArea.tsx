"use client";
import { cn } from "@/lib/twMergeUtill";
import { useEffect, useState } from "react";

const maxCharacters = 300;

export default function TextArea({
  label,
  name,
  className,
  error,
  defaultValue,
  success,
}: {
  className?: string;
  label: string;
  name: string;
  error: { [key: string]: string };
  success?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState<string | undefined>(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);

  const characterCount = value?.length || 0;
  const isNearLimit = characterCount > maxCharacters * 0.9;
  const hasError = error && error[name];

  useEffect(() => {
    if (error) {
      setValue(defaultValue || "");
    }
    if (success) {
      setValue(defaultValue);
    }
  }, [error, defaultValue, success]);

  return (
    <div className={cn("relative space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-base sm:text-lg md:text-xl font-medium text-white capitalize transition-colors duration-200"
        >
          {label}
        </label>

        {/* Character counter */}
        <div
          className={cn(
            "text-xs sm:text-sm transition-colors duration-200",
            isNearLimit ? "text-amber-400" : "text-slate-400",
            characterCount === maxCharacters && "text-red-400"
          )}
        >
          {characterCount}/{maxCharacters}
        </div>
      </div>

      <div className="relative group">
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          maxLength={maxCharacters}
          rows={5}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px]",
            "px-3 sm:px-4 py-2 sm:py-3",
            "text-sm sm:text-base md:text-lg",
            "bg-slate-800/50 ",
            "border-2 rounded-lg sm:rounded-xl ",
            "font-medium text-white placeholder-slate-400",
            "resize-none transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900",
            "planScrollbar trainerDataSquareScrollbar scrollBarRectangle",
            hasError
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
              : success
              ? "border-green-500/50  focus:border-green-500 focus:ring-green-500/50"
              : "border-slate-700/50 focus:border-blue-500 focus:ring-blue-500/50",
            "hover:border-opacity-75"
          )}
          style={{
            // Smooth transition for height changes
            transition: "height 0.2s ease",
          }}
        />

        {/* Focus ring animation */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg sm:rounded-xl",
            "transition-opacity duration-200",
            "pointer-events-none",
            isFocused ? "opacity-100" : "opacity-0",
            hasError
              ? "ring-2 ring-red-500/20"
              : success
              ? "ring-2 ring-green-500/20"
              : "ring-2 ring-blue-500/20"
          )}
        />

        {/* Error message */}
        {hasError && (
          <div className="absolute -top-6 left-0 right-0 flex items-center gap-1.5 text-red-400">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 9.5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-8c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">
              {error[name]}
            </span>
          </div>
        )}

        {/* Success message */}
        {/* {success && (
          <div className="absolute -top-6 left-0 right-0 flex items-center justify-center gap-1.5 text-green-400">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm3.293 5.707-4.293 4.293-2.293-2.293c-.391-.391-1.024-.391-1.414 0s-.391 1.024 0 1.414l3 3c.391.391 1.024.391 1.414 0l5-5c.391-.391.391-1.024 0-1.414s-1.024-.391-1.414 0z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">{success}</span>
          </div>
        )} */}
      </div>

      {/* Visual indicator for remaining characters */}
      <div className="h-0.5 bg-slate-700/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300",
            isNearLimit ? "bg-amber-400" : "bg-blue-500",
            characterCount === maxCharacters && "bg-red-500"
          )}
          style={{
            width: `${(characterCount / maxCharacters) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
