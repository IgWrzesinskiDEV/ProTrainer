import { IoAlertCircleOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

export default function InputWithErrorHandler({
  hasError,
  errorMessage = "Error has occurred",
  placeholder = "New plan name",
  name = "planName",
  type = "text",
  autoFocus = false,
  className = "",
}: {
  hasError: boolean;
  errorMessage?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show error tooltip briefly when error first appears
  useEffect(() => {
    if (hasError) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`
          relative rounded-lg 
          ${
            hasError
              ? "ring-2 ring-red-500/30"
              : isFocused
              ? "ring-2 ring-blue-500/30"
              : ""
          }
        `}
      >
        <input
          ref={inputRef}
          type={type}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-11
            bg-gradient-to-b from-gray-800 to-gray-900
            text-white placeholder:text-gray-500
            px-4 py-2.5 
             transition-all duration-200
            outline-none
            
            hover:from-gray-750 hover:to-gray-850
            
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              hasError
                ? "border-red-500/70 focus:border-red-500 hover:border-red-500/80"
                : "border-gray-700 focus:border-blue-500 hover:border-blue-500/50"
            }
          `}
        />

        {hasError && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <div className="relative group">
              <IoAlertCircleOutline className="text-xl text-red-500 cursor-pointer" />

              {showTooltip && (
                <div className="absolute bottom-full right-0 mb-2 w-max z-[1000] animate-in fade-in slide-in-from-right-1 duration-200">
                  <div className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                    <div className="relative">
                      {errorMessage}
                      <div className="absolute w-2 h-2 bg-red-500 rotate-45 -bottom-1 right-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Accessible error message for screen readers */}
      {hasError && (
        <div className="sr-only" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
