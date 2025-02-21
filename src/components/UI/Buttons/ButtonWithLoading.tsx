import { CircularProgress } from "@mui/material";
import { cn } from "@/lib/twMergeUtill";
interface ButtonWithLoadingProps {
  isLoading: boolean;
  loadingClass?: string;
  isDisabled?: boolean;
  children: React.ReactNode | string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

export default function ButtonWithLoading({
  isLoading,
  children,
  type,
  isDisabled,
  loadingClass,
  className,
  onClick,
  ...props
}: ButtonWithLoadingProps) {
  return (
    <button
      disabled={isDisabled}
      {...props}
      type={type}
      onClick={onClick}
      className={cn(
        ` flex items-center justify-center     transition-all duration-150 `,
        className,
        isLoading && loadingClass
      )}
    >
      {isLoading ? <CircularProgress size={28} /> : children}
    </button>
  );
}

// mx-auto mt-4 hover:bg-blue-600 bg-blue-500 rounded-lg py-2 text-xl disabled:opacity-30
