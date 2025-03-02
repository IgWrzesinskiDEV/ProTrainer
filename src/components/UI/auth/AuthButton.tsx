import type React from "react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface AuthButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function AuthButton({
  children,
  className,
  ...props
}: AuthButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `relative py-3 px-6 text-base sm:text-lg font-medium bg-blue-600 hover:bg-blue-700 
        active:bg-blue-800 rounded-lg flex items-center justify-center w-full 
        transition-all duration-300 ease-in-out shadow-lg hover:shadow-blue-500/20
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed`,
        className
      )}
    >
      {children}
    </button>
  );
}
