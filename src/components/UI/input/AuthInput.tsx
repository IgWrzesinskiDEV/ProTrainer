import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  className?: string;
  name: string;
}

export default function AuthInput({
  label,
  name,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
        {label}
      </label>
      <input
        {...props}
        name={name}
        placeholder={`Enter your ${label}`}
        className={twMerge(
          `w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
          text-white placeholder-gray-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-300
          disabled:opacity-60 disabled:cursor-not-allowed`,
          className
        )}
      />
    </div>
  );
}
