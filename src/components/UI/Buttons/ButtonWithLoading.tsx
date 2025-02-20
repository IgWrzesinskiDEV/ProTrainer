import { CircularProgress } from "@mui/material";
import { cn } from "@/lib/twMergeUtill";
interface ButtonWithLoadingProps {
  isLoading: boolean;
  children: React.ReactNode | string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

export default function ButtonWithLoading({
  isLoading,
  children,
  type,
  className,
  onClick,
}: ButtonWithLoadingProps) {
  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className={cn(
        `py-2 text-xl hover:bg-blue-600 bg-blue-500 rounded-lg flex items-center justify-center w-full mx-auto mt-4 disabled:bg-opacity-0 disabled:border-stone-700 disabled:border-2 transition-all duration-150 `,
        className
      )}
    >
      {isLoading ? <CircularProgress size={28} /> : children}
    </button>
  );
}
