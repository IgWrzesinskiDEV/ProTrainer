import { ComponentProps } from "react";

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
      className={`py-2 text-xl hover:bg-blue-600 bg-blue-500 rounded-lg flex items-center justify-center w-full mx-auto mt-4 disabled:bg-opacity-0 disabled:border-stone-700 disabled:border-2 transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );
}
